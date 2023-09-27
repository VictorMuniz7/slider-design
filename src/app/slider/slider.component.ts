import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';

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
  songName: string = 'Wild Hunt'
  mediaScreen: string = 'small'
  interval = this.startAutomaticScroll()

  private sliderElement: HTMLElement | null | undefined

  mediaMap: { [key: string]: number} = {
    'small': 200,
    'medium': 560,
    'big': 960,
  }

  songMap: { [key: number]: string } = {
    1: 'Wild Hunt',
    2: 'Outcast',
    3: 'Masquerade',
    4: 'Skins',
    5: 'Rise',
    6: 'Heartsick',
    7: 'Fimbulvetr',
    8: 'Tripwire',
    9: 'Craving',
    10: 'Carpe Diem',
    11: 'Never Change',
    12: 'Fall',
    13: 'Uebok',
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
    if (this.currentImage < 13) {
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

