class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
        this.targetDate = targetDate;
        this.id = null;
        this.onTick = onTick;
        this.refs = {
            days: document.querySelector('[data-value="days"]'),
            hours: document.querySelector('[data-value="hours"]'),
            mins: document.querySelector('[data-value="mins"]'),
            secs: document.querySelector('[data-value="secs"]'),
        };

        this.init();
    }
        
    init() {
        this.id = setInterval(this.calcTime.bind(this), 1000);
    }

    calcTime() {
        const currentDate = Date.now();
        const deltaTime = this.targetDate.getTime() - currentDate;
        
        if (deltaTime < 0) {
            clearInterval(this.id);
            return;
        }
        const time = this.getTimeComponents(deltaTime);
        this.onTick(time);
    }

    getTimeComponents(time) {
        const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        return ({ days, hours, mins, secs });
    }

    pad(number) {
        return String(number).padStart(2, "0")
    }

}

const timer = new CountdownTimer ({
  selector: '#timer-1',
  targetDate: new Date('Aug 17, 2021'),
  onTick: updateTime
});

function updateTime({ days, hours, mins, secs }) {
        this.refs.days.textContent = days;
        this.refs.hours.textContent = hours;
        this.refs.mins.textContent = mins;
        this.refs.secs.textContent = secs;
    }