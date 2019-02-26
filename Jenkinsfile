pipeline {
  environment {
    registry = "srdjanbos/jenkinsbuild"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  tools {nodejs "node" }
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/diwaneemedia/bestproducts-nodejs'
      }
    }
    stage('Build') {
       steps {
         sh 'npm install'
         sh 'npm run build'
       }
    }

    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build -t registry + ":$env.BUILD_ID"
        }
      }
    }
    stage('Deploy Image') {
      steps{
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push("${env.BUILD_NUMBER}")
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps{
        sh "docker rmi $registry:$env.BUILD_ID"
      }
    }
  }
}

