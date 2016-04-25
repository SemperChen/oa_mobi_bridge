import {WorkflowService} from "../services/workflow.service";
import {Component} from "angular2/core";
import {RouteParams, Router} from "angular2/router";
import {WorkflowDetailBorrowApply} from "../entities/workflow-detail-borrowapply";
import {WorkflowDetail} from "../entities/workflow-detail";
/**
 * 工作流清单
 *
 * Created by ChihoSin.
 */
@Component({
    templateUrl: 'app/workflow/templates/workflow-detail.html',
    providers: [WorkflowService]
})
export class workflowDetailComponent {

    public taskId:string;
    public workflowDetail:WorkflowDetail;
    public borrowapplyData:WorkflowDetailBorrowApply;

    constructor(private _workflowService:WorkflowService,
                private _routeParams:RouteParams,
                private _router:Router) {
    }

    ngOnInit() {
        window.scroll(0, 0);
        this.taskId = this._routeParams.get('taskId');
        if (this.taskId == null) {
            this._router.navigate(['WorkflowList', {taskId: 1}]);
        }
        this._workflowService.getWorkflowDetail(this.taskId).then(result=> {
            this.workflowDetail = result;
        });
    }

}