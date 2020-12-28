<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-300">
        <div class="flex flex-col md:flex-row shadow-md bg-white rounded-md md:mt-20 w-full max-w-6xl">
          <div class="flex flex-col border border-r-1  px-4 sm:px-6 md:px-8 lg:px-10 py-8  md:w-1/2">
            <slot name="first">first1</slot>
          </div>

          <div class="flex flex-col border  px-4 sm:px-6 md:px-8 lg:px-10 py-8  md:w-1/2">
            <slot name="second">second2</slot>
          </div>
        </div>
    </div>
</template>