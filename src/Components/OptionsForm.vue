<template>


    <div class="my-10">
        <form @submit.prevent="generate()">
          <div class="flex flex-col mb-6">
              <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">RapidAPI key:</label>
              <div class="relative">
                  
      
                  <input id="secret_key" @keyUp="handleSecretKeyInput($event)" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Key" />
              </div>
              <div class="mt-2 text-sm text-gray-700">Get your free API key here: 
                  <a class="text-indigo-600 text-bold underline hover:text-indigo-900" target="blank" href="https://rapidapi.com/restyler/api/qrcode-supercharged">https://rapidapi.com/restyler/api/qrcode-supercharged</a>
              </div>
          </div>
          

          <div class="flex flex-col mb-6">
            <label for="text" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Text to encode:</label>
            <div class="relative">
              
  
              <input id="text" v-model="options.text" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Text or URL" />
            </div>
          </div>

          <!-- size -->
          <div class="flex flex-col mb-6">
          <label for="size" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Size:</label>
          <div class="relative">
              
  
              <input id="size" v-model="options.size" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-20 py-2 focus:outline-none focus:border-blue-400" placeholder="Size" />
          </div>
          </div>

          <!-- format -->
          <div class="flex flex-col mb-6">
          <label for="format" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">QR code output format:</label>
          <div class="relative flex flex-row space-x-4 text-gray-600">
              
              <div >   
                  <input type="radio"  id="format-svg" value="svg" v-model="options.format">&nbsp;
                  <label for="format-svg">svg</label>
              </div>
              
              <div>   
                  <input type="radio" id="format-png" value="png" v-model="options.format">&nbsp;
                  <label for="format-png">png</label>
              </div>
          </div>
          </div>

          <!-- block style -->
          <div class="flex flex-col mb-6">
            <label for="format" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Block style:</label>
            <div class="relative flex flex-row space-x-4 text-gray-600">
                
                <div v-for="blockStyle in allowedBlockStyles">   
                    <input type="radio"  :id="'block-' + blockStyle" :value="blockStyle" v-model="options.block_style">&nbsp;
                    <label :for="'block-' + blockStyle">{{ blockStyle }}</label>
                </div>
                
            </div>
          </div>

          <!-- block size -->
          <div class="flex flex-col mb-6" v-if="options.block_style == 'dot'">
            <label for="block_size" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Block Size:</label>
            <div class="relative">
              <div class="flex flex-row space-x-4">
                <input id="block_size" v-model="options.block_size" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-20 py-2 focus:outline-none focus:border-blue-400" placeholder="0.2" />
                <input type="range" min="0.1" max="0.99" step="0.01" id="scale-block-size" v-model="options.block_size">
              </div>      
            </div>
          </div>
          
          <!-- eye style -->
          <div class="flex flex-col mb-6">
            <label for="format" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Eye style:</label>
            <div class="relative flex flex-row space-x-4 text-gray-600">
                
              <div v-for="eyeStyle in allowedEyeStyles">   
                <input type="radio"  :id="'eye-' + eyeStyle" :value="eyeStyle" v-model="options.eye_style">&nbsp;
                <label :for="'eye-' + eyeStyle">{{ eyeStyle }}</label>
              </div>
            </div>
          </div>

          <!-- gradient -->
          <div class="w-full">
              
              <label class="flex flex-col cursor-pointer">
                  <div class="flex w-full justify-between">
                    <div class="text-gray-700 ">
                      Use gradient:
                    </div>
                    
                    <div class="ml-3 relative">
                      <input type="checkbox" class="hidden" checked @change="options.gradient = !options.gradient"/>
                      <div class="toggle__line w-10 h-4 bg-cus rounded-full shadow-inner"></div>
                      <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                    </div>
                  </div>
    
                  <div class="text-gray-100 font-medium">
                    description
                  </div>
    
                </label>
          </div>


          <!-- gradient_color_start  -->
          <div class="flex flex-col mb-6" v-if="options.gradient" >
          <label for="gradient_color_start" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Gradient Start Color:</label>
          <div class="relative flex flex-row space-x-2">
              
              <input id="gradient_color_start_txt" v-model="options.gradient_color_start" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-25 py-2 focus:outline-none focus:border-blue-400" />
              <input id="gradient_color_start" v-model="options.gradient_color_start" type="color" class="h-8" />
          </div>
          </div>

          <!-- gradient_color_end  -->
          <div class="flex flex-col mb-6"  v-if="options.gradient">
          <label for="gradient_color_end" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Gradient End Color:</label>
          <div class="relative flex flex-row space-x-2">
              
              <input id="gradient_color_end_txt" v-model="options.gradient_color_end" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-25 py-2 focus:outline-none focus:border-blue-400" />
              <input id="gradient_color_end" v-model="options.gradient_color_end" type="color" class="h-8 " />
          </div>
          </div>

          <!-- gradient_type -->
          <div class="flex flex-col mb-6"  v-if="options.gradient">
          <label for="format" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">QR code output format:</label>
          <div class="relative flex flex-row space-x-4 text-gray-600">
              
              <div v-for="type in allowedGradientTypes">   
                  
                  <label :for="'gradient-'+ type">

                  <input type="radio"  :id="'gradient-'+ type" :value="type" v-model="options.gradient_type">&nbsp;
                  {{type}}</label>
              </div>
              
          </div>
          </div>


          <!-- fg_color  -->
          <div class="flex flex-col mb-6" v-if="!options.gradient" >
          <label for="fg_color" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Foreground Color:</label>
          <div class="relative flex flex-row space-x-2">
              
              <input id="fg_color_txt" v-model="options.fg_color" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-25 py-2 focus:outline-none focus:border-blue-400" />
              <input id="fg_color" v-model="options.fg_color" type="color" class="h-8" />
          </div>
          </div>

          <!-- bg_color  -->
          <div class="flex flex-col mb-6">
              <label for="bg_color" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Background Color:</label>
              <div class="relative flex flex-row space-x-2">
                  
                  <input id="bg_color_txt" v-model="options.bg_color" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-25 py-2 focus:outline-none focus:border-blue-400" />
                  <input id="bg_color" v-model="options.bg_color" type="color" class="h-8" />
              </div>
          </div>


          <!-- logo upload  -->
          <div class="flex flex-col mb-6">
          <label for="gradient_color_end" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Upload logo:</label>
          <div class="relative">
              <input id="file" type="file" />
            
              <div>
                  <span class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">or enter logo URL:</span>
              <input id="logo_url" v-model="options.logo_url" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="https://some-site/logo.png"/>
          
              </div>

              <div class="text-gray-400 text-sm">SVG and PNG formats of logo are supported.</div>
          </div>
          </div>

          <!-- logo size -->
          <div class="flex flex-col mb-6">
          <label for="size" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Logo Size:</label>
          <div class="relative">
              <div class="flex flex-row space-x-4">
                  <input id="logo_size" v-model="options.logo_size" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-20 py-2 focus:outline-none focus:border-blue-400" placeholder="0.2" />
                  <input type="range" min="0.1" max="0.5" step="0.01" id="scale" v-model="options.logo_size">
              </div>
              
              
          </div>
          </div>


          <!-- fill_logo -->
          <div class="w-full mb-6">
              
              <label class="flex flex-col cursor-pointer">
                  <div class="flex w-full justify-between">
                    <div class="text-gray-700 ">
                      Fill logo transparency:
                    </div>
                    
                    <div class="ml-3 relative">
                      <input type="checkbox" class="hidden" @change="options.fill_logo = !options.fill_logo"/>
                      <div class="toggle__line w-10 h-4 bg-cus rounded-full shadow-inner"></div>
                      <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                    </div>
                  </div>
    
    
                </label>
          </div>

          <!-- fill_logo_color  -->
          <div class="flex flex-col mb-6" v-if="options.fill_logo" >
              <label for="fill_logo_color" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Fill logo Color:</label>
              <div class="relative flex flex-row space-x-2">
                  
                  <input id="fill_logo_color_txt" v-model="options.fill_logo_color" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-25 py-2 focus:outline-none focus:border-blue-400" />
                  <input id="fill_logo_color" v-model="options.fill_logo_color" type="color" class="h-8" />
              </div>
          </div>


          <!-- validate -->
          <div class="w-full">
              
              <label class="flex flex-col cursor-pointer">
                  <div class="flex w-full justify-between">
                    <div class="text-gray-700 ">
                      Throw fatal error (instead of warning) if barcode readability is low:
                    </div>
                    
                    <div class="ml-3 relative">
                      <input type="checkbox" class="hidden" @change="options.validate = !options.validate"/>
                      <div class="toggle__line w-10 h-4 bg-cus rounded-full shadow-inner"></div>
                      <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                    </div>
                  </div>
    
    
                </label>
          </div>




          <div class="flex w-full mt-10">
            <button type="submit" :class="{'cursor-not-allowed': this.apiLoading}" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
              <span class="mr-2 uppercase">Generate QR code</span>
              <span>
                <svg v-if="!apiLoading" class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <svg v-else class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                <!--<svg v-else class="animate-spin h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>-->

                </span>
            </button>
          </div>

        </form>
      </div>
  </template>
  <script>
    export default {
        props: { 
            apiOptions: Object,
            apiSecretKey: String,
            apiLoading: Boolean,
            submit: Function
        },
        data () {
            return {
                // @TODO: fix this with props and emit
                options: this.apiOptions,
                //secretKey: this.apiSecretKey,
                allowedGradientTypes: ['horizontal', 'vertical', 'diagonal'],
                allowedBlockStyles: ['round', 'square', 'dot'],
                allowedEyeStyles: ['square', 'circle']
            }
        },
        methods: {
            generate() {
                this.submit();
                //this.options.text = 'ewfwe' + Date.now();
            },
            
            handleSecretKeyInput (e) {
                //console.log('emit', e.target.value)
                this.$emit('update:apiSecretKey', e.target.value)
            }
        }
    }
</script>
