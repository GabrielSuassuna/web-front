import { Router, Request, Response } from "express";
import { authHandler } from "../ApiHandlers/Authorization.handler";

import { ServiceUoW } from "../Service/ServiceUoW";

export class DepartmentController {
  private prefixPath: string = "/department";
  private router: Router;
  private serviceUoW: ServiceUoW;

  constructor() {
    this.serviceUoW = new ServiceUoW();
    this.router = Router();
  }

  public getRouter() {
    this.router.get(
      `${this.prefixPath}`,
      (request: Request, response: Response) => this.getAll(request, response)
    );
    this.router.post(
      `${this.prefixPath}`,
      authHandler,
      (request: Request, response: Response) => this.create(request, response)
    );
    this.router.get(
      `${this.prefixPath}/leader/:professorId`,
      (request: Request, response: Response) =>
        this.getByProfessorLeader(request, response)
    );
    this.router.get(
      `${this.prefixPath}/:departmentId`,
      (request: Request, response: Response) => this.getById(request, response)
    );
    this.router.put(
      `${this.prefixPath}/:departmentId`,
      authHandler,
      (request: Request, response: Response) => this.update(request, response)
    );
    this.router.delete(
      `${this.prefixPath}/:departmentId`,
      authHandler,
      (request: Request, response: Response) => this.delete(request, response)
    );
    this.router.put(
      `${this.prefixPath}/:departmentId/changeCoordinator`,
      authHandler,
      (request: Request, response: Response) =>
        this.updateCourseCoordinator(request, response)
    );
    this.router.put(
      `${this.prefixPath}/:departmentId/changeDepartmentHead`,
      authHandler,
      (request: Request, response: Response) =>
        this.updateDepartmentHead(request, response)
    );

    return this.router;
  }

  private getAll(request: Request, response: Response) {
    this.serviceUoW.departmentService.getAll(request, response);
  }

  private getById(request: Request, response: Response) {
    this.serviceUoW.departmentService.getById(request, response);
  }

  private getByProfessorLeader(request: Request, response: Response) {
    this.serviceUoW.departmentService.getByProfessorLeader(request, response);
  }

  private create(request: Request, response: Response) {
    this.serviceUoW.departmentService.create(request, response);
  }

  private update(request: Request, response: Response) {
    this.serviceUoW.departmentService.update(request, response);
  }

  private delete(request: Request, response: Response) {
    this.serviceUoW.departmentService.delete(request, response);
  }

  private updateCourseCoordinator(request: Request, response: Response) {
    this.serviceUoW.departmentService.updateCourseCoordinator(
      request,
      response
    );
  }

  private updateDepartmentHead(request: Request, response: Response) {
    this.serviceUoW.departmentService.updateDepartmentHead(request, response);
  }
}
