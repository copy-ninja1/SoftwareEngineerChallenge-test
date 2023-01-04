import { autoInjectable } from "tsyringe";
import UserService from "./user.service";
import BaseController from "../base/base.ctl";

@autoInjectable()
export default class UserController extends BaseController {
  constructor(service?: UserService) {
    super(service!);
  }
}
