node {
    def app
    stage('Clone repository') {
        checkout scm
            {
            sh 'npm install'
            sh 'npm run dev'
    }
    }
    stage('Build image') {
        app = docker.build("kanso-cms/best-kanso:${env.BUILD_ID}")
    }

    stage('Push image') {
      withDockerRegistry(url:'https://eu.gcr.io/kanso-cms/') {
        app.push("${env.BUILD_NUMBER}")
        app.push('latest')
      }
    }
/*
    stage('Deploy to K8S') {
                 kubernetesDeploy(kubeconfigId: 'k8s-kanso',
                 secretNamespace: 'cms-kanso',
                 enableConfigSubstitution: true,
                 configs: 'k8s-configs/daemon-set.yaml', // REQUIRED
)
}
*/
    stage('CleanWorkspace') {
                cleanWs()
        }
}
