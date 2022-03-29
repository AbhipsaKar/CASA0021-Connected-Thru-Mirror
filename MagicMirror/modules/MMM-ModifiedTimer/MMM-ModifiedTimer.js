Module.register("MMM-ModifiedTimer", {
  defaults: {
    sound: true,
    soundFile: 'buzz.wav',
  },

  getStyles: function() {
    return [
      "MMM-ModifiedTimer.css",
      "font-awesome.css",
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    ]
  },

  start: function() {
    Log.info("Starting module:" + this.name)
    var self = this;
    // initialize native sound vith HTML5
    this.sound = new Audio()
    this.sound.autoplay = true
    //this.sound.loop = 3
    // create an object for all values
    this.Timer = {
      seconds: 10,
      minutes: 0
      }
    setInterval(function() {
      self.updateDom();
    }, 1000);
    this.notificationmsg = {
      start: 0,
      interrupt: 0,
      timeend:0,
      page:0
    }
  },

  notificationReceived: function(notification, payload, sender) {
      if (notification === "CurrentPage"){
        Log.info("Received " + payload)
        if (payload != 1){
          this.notificationmsg.page = 0
        } else {
          this.notificationmsg.page = 1
        }
      }
      if (this.notificationmsg.page == 1){
      switch(notification) {
        case "START_TIMER":
          if (this.notificationmsg.timeend == 1){
            this.Timer.minutes = 5
            this.Timer.seconds = 0
            this.notificationmsg.start = 0
            this.notificationmsg.timeend = 0
          }
          else{
            this.notificationmsg.start = 1
          }
          
          break
        case "INTERRUPT_TIMER":
          this.Timer.minutes = 5
          this.Timer.seconds = 0
          this.notificationmsg.start = 0
          break
        case "INCREASE_TIMER":
          if(this.Timer.minutes < 5) {
            this.Timer.minutes = this.Timer.minutes +1
          }
          else {
            this.Timer.minutes = 0
          }
          break
        case "DECREASE_TIMER":
          if(this.Timer.minutes > 0) {
            this.Timer.minutes = this.Timer.minutes -1
          }
          else {
            this.Timer.minutes = 5
          }
          break
      }

    }
  },

  getDom: function(){
   var wrapper = document.createElement("div");
   var headerD = document.createElement("span");
    headerD.innerHTML = "Timer</br>";
    headerD.className = "timertitle";
    
    var message = document.createElement("span");
      message.innerHTML = "TIME'S UP</br>";
      message.className = "msg";
      message.style.display = 'none'
    var timeLeft = document.createElement("span");
    timeLeft.style.display = 'block'
    
   if (this.notificationmsg.start == 1){
     
     if (this.Timer.seconds == 0 && this.Timer.minutes == 0){
        message.style.display = 'block'
        timeLeft.style.display = 'none'
        this.notificationmsg.timeend = 1
        //Timer finish
        this.Timer.minutes = 0
        this.Timer.seconds = 0
        //this.notificationmsg.start = 0
        for (let i = 0; i < 4; i++){
          if (this.config.sound) {
            // use native sound (with sound inside sounds directory) or original
            this.sound.src= "/modules/MMM-ModifiedTimer/sounds/" + this.config.soundFile + "?seed=" + Date.now()
          }
        }
      }
      else{
        //countdown
        message.style.display = 'none'
        timeLeft.style.display = 'block'
        if (this.Timer.seconds > 0) this.Timer.seconds--
        else {
          if (this.Timer.minutes > 0) {
            this.Timer.minutes--
            this.Timer.seconds = 59
          } else {
            this.Timer.minutes = -1
            this.Timer.seconds = -1
          }
        }
      }
    }
    
    timeLeft.innerHTML = this.Timer.minutes + ":" +this.Timer.seconds + "</br>";
    timeLeft.className = "timeLeft";
    
    wrapper.appendChild(headerD);
    wrapper.appendChild(timeLeft);
    wrapper.appendChild(message);
    return wrapper;

  },
  
});
