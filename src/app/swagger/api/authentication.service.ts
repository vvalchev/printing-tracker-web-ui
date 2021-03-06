/**
 * PrintingTracker REST API
 * Това REST API дефинира интерфейс за менажиране на база данни от клиенти, принтерите с които те разполагат, и броячи на използваните консумативи.  Този проект е част от дипломна защита на Мария Денкова и Иво Пеев в Технически Университет - София, катедра Компютърни Системи, випуск 2018. 
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { AuthenticationResponse } from '../model/authenticationResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class AuthenticationService {

    protected basePath = 'http://localhost:8080';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (let consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * вход в системата
     * 
     * @param password 
     * @param username 
     * @param rememberMe 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public login(password: string, username: string, rememberMe?: boolean, observe?: 'body', reportProgress?: boolean): Observable<AuthenticationResponse>;
    public login(password: string, username: string, rememberMe?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<AuthenticationResponse>>;
    public login(password: string, username: string, rememberMe?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<AuthenticationResponse>>;
    public login(password: string, username: string, rememberMe?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (password === null || password === undefined) {
            throw new Error('Required parameter password was null or undefined when calling login.');
        }
        if (username === null || username === undefined) {
            throw new Error('Required parameter username was null or undefined when calling login.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (password !== undefined) {
            formParams = formParams.append('password', <any>password) || formParams;
        }
        if (username !== undefined) {
            formParams = formParams.append('username', <any>username) || formParams;
        }
        if (rememberMe !== undefined) {
            formParams = formParams.append('rememberMe', <any>rememberMe) || formParams;
        }

        return this.httpClient.post<AuthenticationResponse>(`${this.basePath}/api/v1/login`,
            convertFormParamsToString ? formParams.toString() : formParams,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * изход от системата
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public logout(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public logout(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public logout(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public logout(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        let httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set("Accept", httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        let consumes: string[] = [
        ];

        return this.httpClient.post<any>(`${this.basePath}/api/v1/logout`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
