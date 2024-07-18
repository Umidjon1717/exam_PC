import { Injectable,CanActivate,ExecutionContext, UnauthorizedException  } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { Roles } from "../decorator/roles.decorator";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private jwtService:JwtService,
        private configService:ConfigService
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request=context.switchToHttp().getRequest()
        return this.ValidateRequest(request)
    }

    async ValidateRequest(request:any):Promise<boolean>{
        const authHeader=request.headers['authorization']
        if(!authHeader){
            throw new UnauthorizedException('Auth is missing')
        }
        try {
            const token=authHeader.split(" ")[1]
            const secret=this.configService.get<string>('JWT_SECRET') || '12345'
            const decoded=this.jwtService.verify(token, {secret:secret})
            request.user=decoded
            return true
            
        } catch (error) {
            throw new UnauthorizedException('Wrong Token')
        }
    }
}


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    
    const user = request.user as any;
    

    if (!user || !user.role) {
      console.error('User or roles property is missing on the user object:', user);
      return false; 
    }
    

    return roles.some(role => user.role.includes(role));

  }
}