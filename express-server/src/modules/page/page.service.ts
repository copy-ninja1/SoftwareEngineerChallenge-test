import { autoInjectable, injectable } from "tsyringe";
const bizSdk = require("facebook-nodejs-business-sdk");
// import fbApi from "../../utils/fbSdk";
// @injectable()
export default class PageService {
  constructor() {}
  getAllPages = (token: string): any => {
    const User = bizSdk.User;
    const Page = bizSdk.Page;

    const access_token = token;
    const id = "749465506699583";
    const api = bizSdk.FacebookAdsApi.init(access_token);

    const fields: any = ["category", "name", "id"];
    const params = {};
    const accounts = new User(id).getAccounts(fields, params);

    return accounts;
  };
  getOnePage(token: string): object {
    return { id: "1", title: "pageone" };
  }
}
