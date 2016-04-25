import {Component, OnInit} from "angular2/core";
import {WorkflowService} from "../services/workflow.service";
import {WorkflowTopic} from "../entities/workflow-topic";
import {Pager} from "../../common/entities/pager";
import {ViewService} from "../../common/services/view.service";
import {Router, RouteParams} from "angular2/router";
/**
 * 工作流清单
 *
 * Created by ChihoSin.
 */
@Component({
    templateUrl: 'app/workflow/templates/workflow-list.html',
    providers: [WorkflowService]
})
export class WorkflowListComponent implements OnInit {

    private _viewService:ViewService;
    public pager:Pager<WorkflowTopic>;
    public topic:WorkflowTopic[];
    public currentPage;

    /**
     * 构造器
     */
    constructor(private _workflowService:WorkflowService,
                private _routeParams:RouteParams,
                private _router:Router) {
        this._viewService = ViewService.getInstance();
        this._viewService.refresh$.subscribe($event=> {
            this.getPager(this.currentPage);
        });
    }

    /**
     * 初始化页面
     */
    ngOnInit() {
        window.scroll(0, 0);
        this.currentPage = this._routeParams.get("currentPage");
        if (this.currentPage == null) {
            this._router.navigate(['WorkflowList', {taskId: 1}]);
        }
        if (this._viewService.isLogin) {
            this.getPager(this.currentPage);
        }
    }

    /**
     * 显示筛选器
     */
    showFilter() {
        jQuery('#dashboardFilterModal').modal('show');
    }

    /**
     * 执行筛选
     */
    doFilter() {
        jQuery('#dashboardFilterModal').modal('hide');
    }

    /**
     * 获取页面数据
     */
    getPager(page:number) {
        console.debug("WorkflowList: load workflow list of page [" + this.currentPage + "]")
        this._workflowService.getWorkflowList().then(pager => {
            this.pager = pager;
            this.topic = pager.list;
        });
    }

    /**
     * 导航到详细页面
     */
    navToDetail(taskId:string) {
        console.debug("WorkflowList: nav to workflow detail of task id [" + taskId + "]");
        this._router.navigate(['WorkflowDetail', {taskId: taskId}]);
    }
}