<template>
    <div>
        <input type="file" @change="onFileSelected">
        <button @click="uploadFile">Upload</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                selectedFile: null
            }
        },
        methods: {
            onFileSelected(event) {
                this.selectedFile = event.target.files[0];
            },
            uploadFile() {
                let formData = new FormData();
                formData.append('file', this.selectedFile);

                axios.post('http://localhost:5000/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(response => {
                    console.log(response);
                }).catch(error => {
                    console.log(error);
                });
            }

        }
    }
</script>
