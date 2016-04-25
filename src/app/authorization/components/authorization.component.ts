import {Component, EventEmitter, Output} from "angular2/core";
import {AuthorizationService} from "../services/authorization.service";
import {User} from "../../user/entities/user";
/**
 * 授权管理
 *
 * Created by ChihoSin.
 */
@Component({
    selector: 'mobi-oa-login',
    templateUrl: 'app/authorization/templates/authorization.html'
})
export class AuthorizationComponent {

    @Output() onLoginSuccess:EventEmitter<User> = new EventEmitter();
    public currentUser:User = {username: '', password: '', department: ''};


    /**
     * 构造器
     */
    constructor(private _authorizationService:AuthorizationService) {
    }

    /**
     * 登录
     */
    doLogin() {
        //判断用户密码不为空
        if (this.currentUser.username && this.currentUser.password) {
            //开始登录
            this._authorizationService.login(this.currentUser.username, this.currentUser.password).then(result => {
                //结果处理
                if (result) {
                    this.currentUser.password = '';
                    this.onLoginSuccess.emit(this.currentUser);
                } else {
                    jQuery('#loginModal').modal('show');
                }
            });
        }
    }
}
