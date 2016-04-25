import {Injectable} from "angular2/core";
import {User} from "../entities/user";
import {Http} from "angular2/http";

/**
 * 用户服务
 */
@Injectable()
export class UserService {

    /**
     * 构造器
     */
    constructor(private http:Http) {
    }


    /**
     * 获取当前用户实体
     * @returns 用户实体(包含'用户名', '部门')
     */
    getCurrentUser():Promise<User> {
        return new Promise<User>(resolve=> {
            let url = '/tec_oa/page/index/index.jsp';
            this.http.get(url).subscribe(res=> {
                var spiltPosition1 = "user_simpleEdit.do'" + ');">';
                var data1 = res.text().split(spiltPosition1)[1];
                var username = data1.split('</div>')[0];
                var splitPosition2 = '<div class="headRightIcoBox hricb_depa" class2=".hricb_depa" ' +
                    'id="deptName" h="100%" m-l="-1%" p-r="1%" float="right" cen-text-v="true" ' +
                    'color="#ffffff" font-size="18" z="5" pos="r">';
                var data2 = res.text().split(splitPosition2)[1];
                var department = data2.split('</div>')[0];
                var user = new User();
                user.username = username;
                user.department = department;
                console.debug("User: get user information [" + user.username + ", " + user.department + "]");
                resolve(user);
            })
        });
    }

}