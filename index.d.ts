import { RequestHandler } from "express"

declare function controllerUtil(handler: RequestHandler): RequestHandler

declare namespace controllerUtil {

}

export = controllerUtil
