class IDrawable {
  draw() {}
}

/*
rysuje punkt na canvasie
*/
class Punkt extends IDrawable {
  constructor(x, y, color='#FF0000') {
    super();
    this.x = x;
    this.y = y;
    this.color = color;

    console.log('Punkt ;)')
  }

  /*
    korzysta z metody canvasu arc która rysuje kropkę
  */
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, 3, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }
}

/*
rysuje odcinek na canvasie
 */
class Odcinek extends IDrawable{
  constructor(p1, p2, color = '#FF0000'){
    super();
    this.p1 = p1;
    this.p2 = p2;
    this.color = color;

    console.log('Odcinek')
  }

  /*
    korzysta z metody canvasu lineTo która rysuje kreskę
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.closePath();
    ctx.stroke();
  }
}

/*
TODO zrobić
 */
class Polprosta extends IDrawable {
  constructor(p1, kat, color='#FF0000'){
    super();
    this.p1 = p1;
    this.kat = kat; //kąt podany w stopniach
    this.color = color;

    console.log('Półprosta')
  }
    draw(ctx) {
      ctx.beginPath();
      let r =  2000; //długość proste
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p1.x + r * Math.cos(Math.PI * this.kat / 180), this.p1.y + r * Math.sin(Math.PI * this.kat / 180));
      ctx.closePath();
      ctx.stroke();
    }

}

class Prosta extends IDrawable {
  constructor(p1, kat, color = "#FF0000") {
    super();
    this.p1 = p1;
    this.kat = kat; //kąt podany w stopniach
    this.color = color;

    console.log('Prosta')
  }
    draw(ctx) {
      ctx.beginPath();
      let r = 3000; //długość prostej
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p1.x + r * Math.cos(Math.PI * this.kat / 180), this.p1.y + r * Math.sin(Math.PI * this.kat / 180));
      ctx.moveTo(this.p1.x, this.p1.y);
      ctx.lineTo(this.p1.x + r * Math.cos(Math.PI * (this.kat + 180) / 180), this.p1.y + r * Math.sin(Math.PI * (this.kat + 180) / 180));
      ctx.closePath();
      ctx.stroke();
    }

}



window.lib = {
  Punkt,
  Odcinek,
  Polprosta,
  Prosta,
  //policzOdcinkiOtoczki,
  //punktPrzecieciaOdcinkow,
};
