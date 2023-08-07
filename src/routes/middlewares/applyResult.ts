import { FastifyReply } from "fastify";
import { ResultValidation } from "../../utils/result-validation";

export function applyResult(result: ResultValidation, res: FastifyReply, successStatusCode:number) {
	if (result.hasError()) {
		if (result.hasCriticalError()) {
			res.code(500);
      res.send("INTERNAL SERVER ERROR")
		} else {
			res.code(400);
		}
		res.send(JSON.stringify(result.getErrorList()));
	}else{
    const cookies = result.getResult().cookie
    if (cookies){
      cookies.forEach(function (cookie){
        res.cookie(cookie.name, cookie.value, cookie.opts || undefined)
      })
      result.dropCookies()
    } 
    if (result.isResultEmpty()) {
      res.code(204);
      res.send();
    } else {
      res.code(successStatusCode);
      res.send(JSON.stringify(result.getResult()));
    } 
  }
}