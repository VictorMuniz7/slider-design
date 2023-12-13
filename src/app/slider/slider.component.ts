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
  songName: string = 'Contraband'
  mediaScreen: string = 'small'
  interval = this.startAutomaticScroll()

  private sliderElement: HTMLElement | null | undefined

  mediaMap: { [key: string]: number} = {
    'small': 200,
    'medium': 560,
    'big': 960,
  }

  songMap: { [key: number]: string } = {
    1: 'Contraband',
    2: 'Fatal Faith',
    3: 'Bounce',
    4: 'Sword in Stone',
    5: 'Wild Hunt',
    6: 'Outcast',
    7: 'Masquerade',
    8: 'Skins',
    9: 'Rise',
    10: 'Heartsick',
    11: 'Fimbulvetr',
    12: 'Tripwire',
    13: 'Craving',
    14: 'Carpe Diem',
    15: 'Never Change',
    16: 'Fall',
    17: 'Uebok',
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
    if (this.currentImage < 17) {
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

