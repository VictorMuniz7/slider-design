import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  currentImage: number = 1;
  buttonDisable: boolean = false;
  slideTime: number = 5000;
  cooldown: number = 1500;

  effectClass: string = ''
  songName: string = 'Fatal Faith'
  mediaScreen: string = 'small'
  interval = this.startAutomaticScroll()

  private sliderElement: HTMLElement | null | undefined

  mediaMap: { [key: string]: number} = {
    'small': 200,
    'medium': 560,
    'big': 960,
  }

  songMap: { [key: number]: string } = {
    1: 'Fatal Faith',
    2: 'Bounce',
    3: 'Sword in Stone',
    4: 'Wild Hunt',
    5: 'Outcast',
    6: 'Masquerade',
    7: 'Skins',
    8: 'Rise',
    9: 'Heartsick',
    10: 'Fimbulvetr',
    11: 'Tripwire',
    12: 'Craving',
    13: 'Carpe Diem',
    14: 'Never Change',
    15: 'Fall',
    16: 'Uebok',
  };

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.mediaScreen = this.getMediaScreen()
    window.addEventListener('resize', event => {
      this.mediaScreen = this.getMediaScreen()
    })
    this.sliderElement = this.elementRef.nativeElement.querySelector('.slider')
  }

  getMediaScreen(): string{
    if(window.matchMedia('(min-width: 37em)').matches){
      return 'medium'
    }
    if(window.matchMedia('(min-width: 37em)').matches){
      return 'big'
    }else{
      return 'small'
    }
  }

  startAutomaticScroll() {
    return setInterval(() => {
      this.slideNext()
    }, this.slideTime)
  }

  scrollDetails(){
    this.effectClass = 'fade'
    this.buttonDisable = true
    setTimeout(() => {
      this.effectClass = ''
      this.buttonDisable = false
    }, 1000);
    clearInterval(this.interval)
    this.interval = this.startAutomaticScroll()
  }

  slideNext() {
   this.scrollDetails()
    if (this.currentImage < 16) {
      this.currentImage += 1;
      this.setSongName();
      this.scrollFunction(this.mediaMap[this.mediaScreen])
    } else {
      this.currentImage = 1
      if (this.sliderElement != null && this.sliderElement != undefined) {
        this.sliderElement.scrollLeft = 0;
        this.setSongName()
      }
    }
  }

  slidePrev() {
    this.scrollDetails()
    if (this.currentImage > 1) {
      this.currentImage -= 1;
      this.setSongName();
      this.scrollFunction(-this.mediaMap[this.mediaScreen])
    }

  }

  scrollFunction(value: number){
    if (this.sliderElement != null && this.sliderElement != undefined) {
      this.sliderElement.scrollLeft += value;
    }
  }

  setSongName() {
    this.songName = this.songMap[this.currentImage];
  }
}

