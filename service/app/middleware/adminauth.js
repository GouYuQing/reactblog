module.exports = options=>{
    return async function adminauth(ctx,next){
        // console.log(ctx.session.openId);
        if(ctx.session.openId){
            await next()//继续向下执行
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}