import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {SidebarComponent} from "./sidebar/components/sidebar.component";
import {AuthorizationComponent} from "./authorization/components/authorization.component";
import {AuthorizationService} from "./authorization/services/authorization.service";
import {MessageService} from "./message/services/message.service";
import {UserService} from "./user/services/user.service";
import {User} from "./user/entities/user";
import {WorkflowListComponent} from "./workflow/components/workflow-list.component";
import {ViewService} from "./common/services/view.service";
import {workflowDetailComponent} from "./workflow/components/workflow-detail.component";


@Component({
    selector: 'mobi-oa',
    templateUrl: 'app/app.html',
    directives: [ROUTER_DIRECTIVES, SidebarComponent, AuthorizationComponent],
    providers: [AuthorizationService, MessageService, UserService]
})
@RouteConfig([
    {path: '/', redirectTo: ['WorkflowList', {currentPage: 1}]},
    {path: '/workflow/list/:currentPage', name: 'WorkflowList', component: WorkflowListComponent},
    {path: '/workflow/detail/:taskId', name: 'WorkflowDetail', component: workflowDetailComponent}
])
export class AppComponent implements OnInit {

    private _viewService:ViewService;
    public unreadMessageCount = 0;
    public currentUser:User = null;
    public isLogin:boolean = false;

    /**
     * 构造器
     */
    constructor(private _authorizationService:AuthorizationService,
                private _userService:UserService,
                private _messageService:MessageService,
                private _router:Router) {
        this._viewService = ViewService.getInstance();
    }

    /**
     * 初始化
     */
    ngOnInit() {
        window.scroll(0, 0);
        this._authorizationService.isLogin().then(isLogin => {
            if (isLogin) {
                this.updateUnreadMessage();
                this.updateUserInformation();
                this._viewService.isLogin = true;
            } else {
                this._viewService.isLogin = false;
            }
            this.isLogin = this._viewService.isLogin;
        });
    }

    /**
     * 登录成功
     * @param $event 用户信息
     */
    loginSuccess($event) {
        this.updateUnreadMessage();
        this.updateUserInformation();
        this._viewService.refresh();
        this._viewService.isLogin = true;
        this.isLogin = this._viewService.isLogin;
    }

    /**
     * 更新未读消息提示
     */
    updateUnreadMessage() {
        this._messageService.getUnreadMessageCount().then(result=> {
            this.unreadMessageCount = result;
        });
    }

    /**
     * 更新当前用户信息
     */
    updateUserInformation() {
        this._userService.getCurrentUser().then(result=> {
            this.currentUser = result;
        });
    }
}