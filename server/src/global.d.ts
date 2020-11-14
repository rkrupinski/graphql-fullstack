declare namespace Express {
  export interface Request {
    user: import("@shared/domain").User;
  }
}
