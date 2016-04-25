import {EventEmitter} from "angular2/core";
export class ViewService {

    static instance:ViewService;
    static isCreating:Boolean = false;
    public refresh$:EventEmitter<boolean>;
    public isLogin:boolean = false;

    constructor() {
        if (!ViewService.isCreating) {
            throw new Error("You can't call new in Singleton instances!");
        }
        this.refresh$ = new EventEmitter();
    }

    static getInstance() {
        if (ViewService.instance == null) {
            ViewService.isCreating = true;
            ViewService.instance = new ViewService();
            ViewService.isCreating = false;
        }
        return ViewService.instance;
    }


    refresh() {
        this.refresh$.emit(true);
    }
}