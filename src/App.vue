<template>
    <!--<link rel="stylesheet" href="https://kit-pro.fontawesome.com/releases/v5.15.1/css/pro.min.css" />-->

<div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
  <div class="flex flex-row shadow-md bg-white rounded-md mt-20 w-full max-w-6xl">
    <div class="flex flex-col border border-r-1  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-1/2 max-w-md">
        <div class="font-medium self-center text-xl sm:text-xl uppercase text-gray-800">QR code builder with API automation</div>
        <div class="text-gray-600">This is a GUI for <b><a target="blank" class="text-indigo-600 text-bold underline hover:text-indigo-900" href="https://rapidapi.com/restyler/api/qrcode-supercharged">qrcode-supercharged</a></b> engine.</div>
        <!--<button class="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200">
          <span class="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"><i class="fab fa-facebook-f"></i></span>
          <span>Login with Facebook</span>
        </button>
        <div class="relative mt-10 h-px bg-gray-300">
          <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
            <span class="bg-white px-4 text-xs text-gray-500 uppercase">Or with Gradient</span>
          </div>
        </div>-->
        <div class="my-10">
          <form @submit.prevent="generate()">
            <div class="flex flex-col mb-6">
                <label for="email" class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">RapidAPI key:</label>
                <div class="relative">
                    
        
                    <input id="secret_key" v-model="secretKey" type="text" class="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Key" />
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
                    <label for="format-svg">Svg</label>
                </div>
                
                <div>   
                    <input type="radio" id="format-png" value="png" v-model="options.format">&nbsp;
                    <label for="format-png">Png</label>
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
              <button type="submit" :class="{'cursor-not-allowed': this.loading}" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in">
                <span class="mr-2 uppercase">Generate QR code</span>
                <span>
                  <svg v-if="!loading" class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
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

            <div class="fixed right-0 top-0 m-5">
                <div v-if="errorMsg" class=" px-4 py-3 my-4 leading-normal text-red-700 bg-red-100 rounded-lg flex space-x-2 flex-row" role="alert" >
                    <span class="inline-block mt-1 items-center">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </span>
                    
                    <span class=""><span v-if="errorHttpCode">Error #{{errorHttpCode}}: </span>
                    {{ errorMsg }}</span>
                </div>
                <div class="px-4 py-3 my-4 leading-normal text-green-700 bg-green-100 rounded-lg flex space-x-2 flex-row" v-if="successMsg">
                    <span class="inline-block mt-1 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </span>
                    
                    <span>
                        {{ successMsg }}
                    </span>
                    
                </div>
            </div>
          </form>
        </div>
    
      </div>

      <div class="flex flex-col  px-4 sm:px-6 md:px-8 lg:px-10 py-8  w-1/2 max-w-lg">

        


        <canvas style="width: 500px;height:500px;border:1px solid #ccc" id="canvas1"></canvas>
        <div  class="mt-4 fixed right-0 bottom-0 m-5">

            <button type="button" @click="generate()" :class="{'cursor-not-allowed': this.loading}" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 px-4 w-full transition duration-150 ease-in">
                <span class="mr-2 uppercase">Regenerate QR code</span>
                <span>
                  <svg v-if="!loading" class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
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
        <div v-if="isReadable" class="px-4 py-3 my-4  text-sm text-gray-600 bg-gray-100 rounded-lg">
            <a href="#" class="text-indigo-600"  @click.prevent="download()">Download as {{ generatedImgFormat.toUpperCase() }} 
                ({{ (prevGeneratedSizeBytes/1024).toFixed() }}KB) </a>
           <!-- To save image to local disc, use Right click (Long touch) -> Save image.-->
        </div>

        <div class="my-4" v-if="prevGeneratedHash">
            <h3 class="text-2xl">API options:</h3>
            <pre>{{ JSON.stringify(options, null, 4) }}
            </pre>

            <div class="px-4 py-3 my-4  text-sm text-gray-600 bg-gray-100 rounded-lg">
                Try these directly on <a class="text-indigo-600" target="blank" href="https://rapidapi.com/restyler/api/qrcode-supercharged/endpoints">https://rapidapi.com/restyler/api/qrcode-supercharged/endpoints</a>
            </div>
            
            
        </div>
        <!--<div>
            <textarea cols=80 rows=20>{{generatedImgBlob}}</textarea>
        </div>-->

        <div v-if="isReadable === false" class=" px-4 py-3 my-4 leading-normal text-orange-700 bg-orange-100 rounded-lg flex space-x-2 flex-row" role="alert" >
            <span class="inline-block mt-1 items-center">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" >
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>

            <!--<svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>-->
            </span>
        
            <span>This QR code may be not readable, please double check it using QR code reader.</span>
        </div>

      </div>
  </div>
  
</div>
    </template>
    
    <script>
        const axios = require('axios');
        
    
    export default {
      created() {
        //alert('gg')
      },
      data() {
        return {
            prevGeneratedHash: null,
            prevGeneratedSizeBytes: null,
            generatedImgBlob: null,
            generatedImgFormat: null,
            secretKey: '',
            allowedGradientTypes: ['horizontal', 'vertical', 'diagonal'],
            errorMsg: '',
            successMsg: '',
            errorHttpCode: null,
            isReadable: null,
            loading: false,
            options: {
                text: 'https://google.com',
                size: 800,
                format: 'svg',
                gradient: true,
                gradient_type: 'diagonal',
                validate: false,
                gradient_color_start: '#FF0000',
                gradient_color_end: '#00FF00',
                logo_size: 0.24,
                fg_color: '#FF0000',
                bg_color: '#FFFFFF',
                fill_logo: false,
                fill_logo_color: '#FFFFFF'
            }
            
        }
      },
      computed: {
          needRegeneration() {
              return this.prevGeneratedHash != JSON.stringify(this.options)
              
          }
      },
      methods: {
        download() {
            
            /*var iframe = "<iframe width='100%' height='100%' src='" + this.imgBlob + "'></iframe>"
            var x = window.open();
            x.document.open();
            x.document.write(iframe);
            x.document.close();*/
            var a = document.createElement("a");
            a.href = this.generatedImgBlob;
            a.setAttribute("download", 'qrcode.' + this.generatedImgFormat);
            a.click();
        },
        generate() {
            var formData = new FormData();
            var imagefile = document.querySelector('#file');

            if (!this.secretKey || this.secretKey.length < 10) {
                this.errorMsg = 'RapidAPI key is required to use the generator.';
                return;
            }

            for ( var key in this.options ) {
                if (typeof this.options[key] === "boolean"){
                    // variable is a boolean
                    formData.append(key, this.options[key] ? 1 : 0);
                } else {
                    formData.append(key, this.options[key]);
                }

                
            }
            formData.append("logo_upload", imagefile.files[0]);

            this.loading = true;

            axios.post('https://qrcode-supercharged.p.rapidapi.com/', formData, {
                headers: {
                    'x-rapidapi-key': this.secretKey,
                    'Content-Type': 'multipart/form-data'
                },
                responseType: 'arraybuffer'
            })
            .then((response) => {
                //console.log(response);
                let imgBase64 = Buffer.from(response.data, 'binary').toString('base64');
                //console.log(imgBase64);
                this.successMsg = 'QR code generated successfully!'
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if(response.headers['x-qrcode-readable'] == '0') {
                    this.isReadable = false;
                } else {
                    this.isReadable = true;
                }
                this.errorMsg = '';
                this.prevGeneratedSizeBytes = response.data.byteLength;
                this.draw("data:"+response.headers["content-type"] + ";base64,"+imgBase64)
            })
            .catch( (error) => {
                this.successMsg = '';
                if (error.response && error.response.status) {
                    // convert from array buffer https://gist.github.com/nuclearglow/ab251744db0ebddd504eea28153eb279#gistcomment-3492999
                    let outputString = String.fromCharCode.apply(null, new Uint8Array(error.response.data));
                    // rapidAPI throws json errors
                    if (error.response.headers['content-type'] == 'application/json') {
                        let json = JSON.parse(outputString);
                        this.errorMsg = json.message;
                    } else {
                        this.errorMsg = outputString;
                    }
                    
                    this.errorHttpCode = error.response.status;
                }
                
            })
            .then(() => {
                this.msgTimer = setTimeout(() => {
                    this.successMsg = ''
                    this.errorMsg = ''
                }, 4000)
                this.prevGeneratedHash = JSON.stringify(this.options)
                this.loading = false
            });

            
        },

        draw(imgBase64) {
            //imgBase64 = "data:image/png;base64,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";
            
            this.generatedImgBlob = imgBase64;
            this.generatedImgFormat = this.options.format;

            var canvas = document.getElementById("canvas1");
            var ctx = canvas.getContext("2d");

            //console.log('format:', imgBase64.substr(0, 70));

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            /*ctx.beginPath();
            ctx.arc(100, 100, 50, 1.5 * Math.PI, 0.5 * Math.PI, false);
            ctx.lineWidth = 10;
            ctx.stroke();
            var imgData = canvas.toDataURL();*/

            var image = new Image();
            //image.style.width="100px";
            //image.style.height="100px";
            image.onload = function() {
                //console.log('img width:', image.width);
                canvas.width = image.width;
                canvas.height = image.height;

                ctx.drawImage(image, 0, 0);
                //ctx.drawImage(image, 0, 0, 200, 400, 0, 0, 200, 200);
            };
            //console.log('img6733', imgBase64);
            image.src=imgBase64;

            //image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oMCRUiMrIBQVkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAADElEQVQI12NgoC4AAABQAAEiE+h1AAAAAElFTkSuQmCC";
        }

      }
    }
    </script>
    
    <style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    .toggle__dot {
      top: -.25rem;
      left: -.25rem;
      transition: all 0.3s ease-in-out;
    }
    
    input:checked ~ .toggle__dot {
      transform: translateX(100%);
      background-color: #777;
    }
    
    .bg-cus {
      background-color: #dcdcdc;
    }
    
    html {
      background-color: #fcfcfc;
    }
    </style>
    