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

import { CreatePrintingDeviceRequest } from '../model/createPrintingDeviceRequest';
import { PrintingDevice } from '../model/printingDevice';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PrintingDeviceService {

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
     * 
     * 
     * @param request 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createPrintingDevice(request: CreatePrintingDeviceRequest, observe?: 'body', reportProgress?: boolean): Observable<PrintingDevice>;
    public createPrintingDevice(request: CreatePrintingDeviceRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PrintingDevice>>;
    public createPrintingDevice(request: CreatePrintingDeviceRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PrintingDevice>>;
    public createPrintingDevice(request: CreatePrintingDeviceRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (request === null || request === undefined) {
            throw new Error('Required parameter request was null or undefined when calling createPrintingDevice.');
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
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.post<PrintingDevice>(`${this.basePath}/api/v1/printingDevices`,
            request,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param deviceSerialNumber 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deletePrintingDevice(deviceSerialNumber: string, observe?: 'body', reportProgress?: boolean): Observable<PrintingDevice>;
    public deletePrintingDevice(deviceSerialNumber: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PrintingDevice>>;
    public deletePrintingDevice(deviceSerialNumber: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PrintingDevice>>;
    public deletePrintingDevice(deviceSerialNumber: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (deviceSerialNumber === null || deviceSerialNumber === undefined) {
            throw new Error('Required parameter deviceSerialNumber was null or undefined when calling deletePrintingDevice.');
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
        ];

        return this.httpClient.delete<PrintingDevice>(`${this.basePath}/api/v1/printingDevices/${encodeURIComponent(String(deviceSerialNumber))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param deviceSerialNumber 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPrintingDevice(deviceSerialNumber: string, observe?: 'body', reportProgress?: boolean): Observable<PrintingDevice>;
    public getPrintingDevice(deviceSerialNumber: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PrintingDevice>>;
    public getPrintingDevice(deviceSerialNumber: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PrintingDevice>>;
    public getPrintingDevice(deviceSerialNumber: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (deviceSerialNumber === null || deviceSerialNumber === undefined) {
            throw new Error('Required parameter deviceSerialNumber was null or undefined when calling getPrintingDevice.');
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
        ];

        return this.httpClient.get<PrintingDevice>(`${this.basePath}/api/v1/printingDevices/${encodeURIComponent(String(deviceSerialNumber))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getPrintingDevices(observe?: 'body', reportProgress?: boolean): Observable<Array<PrintingDevice>>;
    public getPrintingDevices(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PrintingDevice>>>;
    public getPrintingDevices(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PrintingDevice>>>;
    public getPrintingDevices(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<Array<PrintingDevice>>(`${this.basePath}/api/v1/printingDevices`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param deviceSerialNumber 
     * @param update 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updatePrintingDevice(deviceSerialNumber: string, update: CreatePrintingDeviceRequest, observe?: 'body', reportProgress?: boolean): Observable<PrintingDevice>;
    public updatePrintingDevice(deviceSerialNumber: string, update: CreatePrintingDeviceRequest, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PrintingDevice>>;
    public updatePrintingDevice(deviceSerialNumber: string, update: CreatePrintingDeviceRequest, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PrintingDevice>>;
    public updatePrintingDevice(deviceSerialNumber: string, update: CreatePrintingDeviceRequest, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (deviceSerialNumber === null || deviceSerialNumber === undefined) {
            throw new Error('Required parameter deviceSerialNumber was null or undefined when calling updatePrintingDevice.');
        }
        if (update === null || update === undefined) {
            throw new Error('Required parameter update was null or undefined when calling updatePrintingDevice.');
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
        ];
        let httpContentTypeSelected:string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set("Content-Type", httpContentTypeSelected);
        }

        return this.httpClient.put<PrintingDevice>(`${this.basePath}/api/v1/printingDevices/${encodeURIComponent(String(deviceSerialNumber))}`,
            update,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
