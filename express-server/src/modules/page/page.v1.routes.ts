import { Router } from "express";
import validate from "../../middlewares/validate";
import { page } from "./page.schemas";
import PageController from "./page.ctl";
import { userIdInput } from "../user/user.schemas";

const pageRouter = Router();
const pageCtl = new PageController();

pageRouter.get("/", validate(userIdInput), pageCtl.getPages);
pageRouter.get("/:pageId", validate(page), pageCtl.getPage);

export default pageRouter;
