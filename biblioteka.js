class IDrawable {
  draw() {}
}

/*
Komenatarz dodać jak działa
*/
class Punkt extends IDrawable {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;

    console.log('Punkt ;)')
  }

  /*
    dodać komentarze
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#FF0000";
    ctx.arc(this.x, this.y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}

class Polprosta extends IDrawable {
  constructor(p1) {
    this.p1 = p1;
  }
}

class Odcinek extends IDrawable{
  constructor(p1, p2){
    super();
    this.p1 = p1;
    this.p2 = p2;

    console.log('Odcinek')
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.closePath();
    ctx.stroke();
  }
}

window.lib = {
  Punkt,
  Odcinek,
}
