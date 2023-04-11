import express from "express";
import { currentUser } from "@ksntickets/common";

const router = express.Router();



router.get("/api/users/currentuser", currentUser, (req, res) => {


    // This sends back null if req.currentUser is undefined
res.send({currentUser: req.currentUser || null});

});

export { router as currentUserRouter };
