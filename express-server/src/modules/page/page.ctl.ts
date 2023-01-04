import { Request, Response } from "express";
import { autoInjectable } from "tsyringe";
import PageService from "./page.service";
import { GetPageInput } from "./page.schemas";
import { GetUserInput } from "../user/user.schemas";
import UserDocument from "src/interfaces/user.interface";
import UserService from "../user/user.service";
import BaseController from "../base/base.ctl";

@autoInjectable()
export default class PageController extends BaseController {
  constructor(service?: UserService) {
    super(service!);
  }
  private page: PageService = new PageService();

  getPageOwner = async (userId: string) => {
    let pagerOwner = this.service.getById<UserDocument>(userId);
    return pagerOwner;
  };

  getPages = async (req: Request<{}, {}, {}, GetUserInput["query"]>, res: Response) => {
    try {
      const pageOwner = await this.service.getById<UserDocument>(req.query.userId);
      if (pageOwner) {
        const accesstoken = pageOwner.accessToken;
        const allPages = await this.page.getAllPages(accesstoken);
        let pages = allPages.map((data: any) => {
          return data._data;
        });
        return res.status(201).json({ owner: pageOwner, pages: pages });
      }
      return res.status(404).json({
        message: "Owner not found",
      });
    } catch (err) {
      return res.status(500).json({ message: "An error occured while trying to fetch all your pages" });
    }
  };

  getPage = async (req: Request<GetPageInput["params"], {}, GetPageInput["body"]>, res: Response) => {
    try {
      const pageOwner = await this.getPageOwner(req.body.userId);
      if (pageOwner) {
        const accesstoken = pageOwner.accessToken;
        let page = await this.page.getOnePage(accesstoken);
        return res.status(201).json({ owner: pageOwner, page });
      }
      return res.status(404).json({
        message: "Owner not found",
      });
    } catch (err) {
      return res.status(500).json({ message: "An error occured while trying to fetch page" });
    }
  };
}
