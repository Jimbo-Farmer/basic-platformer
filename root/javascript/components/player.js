export function renderplayer(ctx, x, y){
    //body
    ctx.fillStyle = body.colour;
    ctx.fillRect(x-10, y-20, body.width, body.height);
    //head
    ctx.fillStyle = head.colour;
    ctx.fillRect(x-10, y-40, head.width, head.height);
}


let body = {
    colour: 'green',
    height: 20,
    width: 20,
}

let head = {
    colour: 'orange',
    height: 20,
    width: 22,
}


export let playerDetails = {
    x: 120, 
    y: 100,
    width: body.width,
    height: body.height + head.height,
    jump: false, 
    x_v: 0, 
    y_v: 0, 
};