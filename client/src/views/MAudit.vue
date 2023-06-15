<template>
    <div>
        <button @click="downloadFile('filename.txt')">查看文件</button>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        methods: {
            downloadFile(filename) {
                axios({
                    url: 'http://localhost:5000/api/download/' + 'ad0ef92329ef84e6267b8ac64536c041',
                    method: 'GET',
                    responseType: 'blob', // Important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', filename);
                    document.body.appendChild(link);
                    link.click();
                });
            },
        },
    };
</script>

