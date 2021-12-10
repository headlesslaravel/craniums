<template>
    <div class="px-6 py-12">
        <div class="flex items-center justify-center">
            <svg
                class="h-16 w-16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="fill-current text-gray-300"
                    d="M6 2h6v6c0 1.1.9 2 2 2h6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2z"
                />
                <polygon class="fill-current text-gray-500" points="14 2 20 8 14 8"/>
            </svg>
        </div>
        <div class="mt-4 text-center max-w-xl mx-auto">
            <slot name="empty"> no results</slot>
        </div>
    </div>
</template>
