import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Intercepteur du client HTTP Angular permettant de paramétrer toutes les requêtes envoyées.
 *
 * Ici, nous ajoutons la configuration "withCredentials: true" pour que la requête comporte les cookies stockés.
 *
 * Le cookie d'authentification AUTH-TOKEN sera envoyé au serveur s'il est présent.
 *
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    if (req.url.match(/api-adresse.data.gouv.fr\//)) { return next.handle(req) } else {

      const cRequest = req.clone({
        withCredentials: true
      });

      return next.handle(cRequest);
    }
  }

  constructor() { }
}
