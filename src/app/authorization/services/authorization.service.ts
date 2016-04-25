import {Injectable} from "angular2/core";
import {Http, Headers, RequestOptions} from "angular2/http";
import {Md5} from "../../util/md5";
/**
 * 用户授权服务
 *
 * Created by ChihoSin.
 */
@Injectable()
export class AuthorizationService {

    private companyId:string = '1111';
    private companyName:string = '广东德生科技股份有限公司';
    private companyReferred:string = 'tec';

    constructor(private http:Http) {
    }

    /**
     * 获取登录状态
     * @return true - 已登录, false - 未登录
     */
    isLogin():Promise<boolean> {
        console.debug("Authorization: check user login");
        return new Promise<boolean>(resolve => {

            let url = "/tec_oa/page/index/index.jsp";

            this.http.get(url).subscribe(res=> {
                let suffix = res.url.substr(-9);
                if (suffix == "index.jsp") {
                    console.debug("Authorization: user is login");
                    resolve(true);
                } else {
                    console.debug("Authorization: user is no login");
                    resolve(false);
                }

            });

        });
    }

    /**
     * 登录
     * @param username 用户名
     * @param password 密码
     * @return true - 登录成功, false - 登录失败
     */
    login(username:string, password:string):Promise<boolean> {
        console.debug("Authorization: login");
        return new Promise<boolean>(resolve => {
            let md5 = new Md5().hex_md5(password);

            let body = 'companyId=' + this.companyId +
                '&companyName=' + this.companyName +
                '&companyReferred=' + this.companyReferred +
                '&userName=' + username +
                '&passWord=' + password +
                '&NewpassWord=' + md5;

            let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
            let options = new RequestOptions({headers: headers});
            let url = '/tec_oa/login_check.do';

            this.http.post(url, body, options).subscribe(res=> {
                let suffix = res.url.substr(-9);
                if (suffix == "index.jsp") {
                    console.debug("Authorization: login success");
                    resolve(true);
                } else {
                    console.debug("Authorization: login fail");
                    resolve(false);
                }
            })
        });

    }

}
