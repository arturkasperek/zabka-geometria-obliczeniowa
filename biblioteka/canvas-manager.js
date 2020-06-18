// Autorzy: Artur Kasperek, Szymon Kędziora, Mateusz Lemiszka

class CanvasManager {
  constructor(elements, canvasElement, controlContainer) {
    // inicjalizacja klasy
    this.elements = elements;
    this.canvas = canvasElement;
    this.controlContainer = controlContainer;
    this.transformation = {
      translation: {
        x: 0,
        y: 0,
      }
    };
    this.mouseDown = false;

    this.initControlContainer();
  }

  initControlContainer() {
    // ustawiamy HTML który jest interfejsem dla użytkownika
    this.controlContainer.innerHTML = `
      <div style="background-color: #EEEEEE; width: 500; display: flex">
        <div>
          <div><button class="up" style="width: 120">Góra</button></div>
          <div>
            <button class="left" style="width: 60">Lewo</button>
            <button class="right" style="width: 60">Prawo</button>
          </div>
          <div><button class="down" style="width: 120">Dół</button></div>
        </div>
        <div>
            <button class="zoom-in">Przybliż</button>
            <button class="zoom-out">Oddal</button>
        </div>
        <div>Kliknij na canvas i przesuwaj myszką</div>
      </div>
    `;

    // obsługa kliknięć użytkownika
    this.controlContainer.querySelector('.up').onclick = () => {
      this.transformation.translation.y += 10;
      this.draw();
    };

    this.controlContainer.querySelector('.down').onclick = () => {
      this.transformation.translation.y -= 10;
      this.draw();
    };

    this.controlContainer.querySelector('.left').onclick = () => {
      this.transformation.translation.x += 10;
      this.draw();
    };

    this.controlContainer.querySelector('.right').onclick = () => {
      this.transformation.translation.x -= 10;
      this.draw();
    };

    this.controlContainer.querySelector('.zoom-in').onclick = () => {
      const context = this.canvas.getContext('2d');
      context.scale(1.1, 1.1);
      this.draw();
    };

    this.controlContainer.querySelector('.zoom-out').onclick = () => {
      const context = this.canvas.getContext('2d');
      context.scale(0.9, 0.9);
      this.draw();
    };

    // jeżeli mysza wciśnięta przesuwamy odpowiednio wszystkie obiekty
    this.canvas.addEventListener('mousemove', (e) => {
      if(this.mouseDown) {
        this.transformation.translation = {
          x: this.transformation.translation.x + e.movementX,
          y: this.transformation.translation.y + e.movementY,
        };
        this.draw();
      }
    }, true);

    this.canvas.addEventListener('mousedown', () => {
      this.mouseDown = true;
    }, false);

    this.canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
    }, false);
  }

  // dodawanie nowych elementów
  addElements(newElements) {
    this.elements = [
      ...this.elements,
      ...newElements,
    ];
  }

  // czyszczenie
  clearElements() {
    this.elements = [];
  }

  // rysowanie obiektów
  draw() {
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, 50000, 50000);

    // rysujemy wraz z translacją
    this.elements.forEach((element) => {
      element.draw(context, this.transformation);
    });
  }
}

window.CanvasManager = CanvasManager;
