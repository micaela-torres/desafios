import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as gitStrategy } from "passport-github2";

import Carts from "../entidades/carts.js";
import Users from "../entidades/Users.js";
// @ts-ignore
import { cm } from "../dao/cart.manager.fs.js";
import { cmg } from "../dao/cart.manager.mg.js";
// @ts-ignore
import { um } from "../dao/users.manager.fs.js";
import { umg } from "../dao/users.manager.mg.js";
import { bcCompare } from "../utils/hasher.js";
import { ErrorAuth } from "../entidades/errorauth.js";
import { CLIENTID_GIT, CLIENTSCR_GIT } from "../config/config.git.js";

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    const userfinder = await umg.findUserByCondition({
      email: username,
    });
    const user = userfinder[0];
    if (!user) return done(new ErrorAuth());
    if (!bcCompare(password, user.password)) return done(new ErrorAuth());
    await cmg.delAllProductsInCart(user.cart);

    done(null, {
      name: user.first_name + " " + user.last_name,
      email: user.email,
      age: user.age,
      cart: user.cart?._id,
    });
  })
);

passport.use(
  "git",
  new gitStrategy(
    {
      clientID: CLIENTID_GIT,
      clientSecret: CLIENTSCR_GIT,
      callbackURL: "http://localhost:8080/api/sessions/gitcall",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const newcart = new Carts();
        const cart = await cmg.addCart(newcart);
        req.session.cart = cart._id;
        const user = {
          email: profile.username,
          first_name: profile.displayName,
          last_name: profile.displayName,
          age: 0,
          password: `${profile.displayName}verficated`,
          role: profile.email === "adminCoder@coder.com" ? "admin" : "user",
          cart: cart.id,
        };

        const newusr = new Users(user);
        const userCreated = await umg.addUser(newusr.datos());
        // const objusr = JSON.parse(JSON.stringify(userCreated));

        req.session.user = userCreated;
      } catch (error) {
        await cmg.deleteCart(req.session.cart);
        try {
          const finder = await umg.findUserByCondition({
            email: profile.username,
          });
          const user = JSON.parse(JSON.stringify(finder[0]));
          await cmg.delAllProductsInCart(user.cart);
          req.session.user = user;
        } catch {
          done(error);
        }
      }
      done(null, {
        name: req.session.user.first_name + " " + req.session.user.last_name,
        email: req.session.user.email,
        age: req.session.user.age,
        cart: req.session.user.cart?._id,
      });
    }
  )
);

// esto lo tengo que pasar para que pasport maneje las sesiones
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

export const passportInitialize = passport.initialize();
export const passportSession = passport.session();

//mid a exportar

export const authLocal = passport.authenticate("local", {
  failWithError: true,
});

export const authGithub = passport.authenticate("git", {
  scope: ["user:email", "read:user"],
});
export const anthGithub_CB = passport.authenticate("git", {
  failWithError: true,
});
