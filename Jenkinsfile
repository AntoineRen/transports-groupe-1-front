pipeline {
    agent any
    environment {
        GH_ORG = "2020-D02-java"
        APP_REPO = "transports-groupe-1-front"
        BACKEND_PROD = "https://transports-back.cleverapps.io/"
    }
    stages {
        stage('install') {
          steps {
              sh 'npm install'
          }
        }
        stage('build') {
          steps {
              sh 'npm run ./prepare-prod.js'
              sh 'npm run build'
          }
        }
        stage('deploy') {
         when {
              branch 'master'
         }
         steps {
              sh 'npm run deploy'
              discordSend link: "https://${GH_ORG}.github.io/${APP_REPO}/", result: "${currentBuild.currentResult}", title: "Déploiement Front ! ${env.JOB_NAME} commit ${env.GIT_COMMIT}", webhookURL: "${DISCORD_D2020_D02}"
         }
       }
    }
    post {
         failure {
             discordSend link: "${env.BUILD_URL}",  result: "${currentBuild.currentResult}", title: "oops ! ${env.JOB_NAME} commit ${env.GIT_COMMIT}", webhookURL: "${DISCORD_D2020_D02}"
         }
     }
}
