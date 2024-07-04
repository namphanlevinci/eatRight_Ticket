pipeline {
	agent {
		docker {
		args '''
 		-u jenkins:jenkins
		-v /var/lib/jenkins/project:/var/lib/jenkins/project
		-v /var/lib/jenkins/project/pipeline/nailzone/dev/cache/yarn:/home/jenkins/.cache
		-v /var/lib/jenkins/project/pipeline/nailzone/dev/cache/npm:/home/jenkins/.npm'''
		image 'harrylehuu/levinci_node:20.11'
		}
	}
	stages {
		stage('Get Atuhor') {
			steps {
			  script {
				env.GIT_COMMIT_MSG = sh (returnStdout: true, script: 'git log -1 --pretty=%B').trim()
				env.GIT_AUTHOR = sh (script: 'git log -1 --pretty=%cn ${GIT_COMMIT}', returnStdout: true).trim()
			  }
			}
		}
		stage('Package Install') {
			steps {
				sh '''
				npm install'''
			}
		}
		stage('Build F&B demo') {
			when {
				branch 'uat'
			}
			steps {
				sh '''echo "NODE_OPTIONS=--max-old-space-size=1024" >> ~/.bash_profile
				. ~/.bash_profile
				CI=false npm run build
				cd build
				tar -cvf ${program_filename}.tar .
				mv ${program_filename}.tar ${WORKSPACE}'''
			}
		}	
		stage('Build and Deploy to demo') {
			when {
				branch 'uat'
			}
			steps {
				sshPublisher(publishers: [sshPublisherDesc(configName: 'fnb_prepro', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''set -xe
					program_filename=fnb_prepro
					origin_path=/home/fnb/target/
					app_path=/home/fnb/web/fnb.levincidemo.com/public_html/
					#Source file
					origin_filename=${origin_path}${program_filename}.tar
					#Unzip file
					tar -xvf ${origin_filename} -C ${app_path}
					#After copying, delete the source file
					if [ -f "${origin_filename}" ];then 
						rm -f ${origin_filename}
						echo "${origin_filename} delete success"
					fi
					#Write the code for your startup program.
					echo "completed"''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'fnb_prepro.tar')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: true)])
			}
		}
	}
	environment {
		BUILD_TRIGGER_BY = "${currentBuild.getBuildCauses()[0].shortDescription} / ${currentBuild.getBuildCauses()[0].userId}"
		program_filename = 'fnb_prepro'
	}
	post {
		success {
			script {
				slackSend channel: 'fnb', color: '#00FF00', message: "Hi\n Jenkins Notification\n\n Manually deploy by:  ${BUILD_TRIGGER_BY}\n Status Deploy Job:  ${currentBuild.result}\n\n Project Name:  ${env.JOB_NAME.replaceFirst('/.*', '')}              Build Number:  #${env.BUILD_NUMBER}                Branch Name:  ${env.BRANCH_NAME}\n Comitted by:  ${env.GIT_AUTHOR}\n Last commit message:  ${env.GIT_COMMIT_MSG}\n\n Commit Code: ${GIT_COMMIT}\n Commit URL: https://github.com/git-levinci/${env.JOB_NAME.replaceFirst('/.*', '')}/commit/${GIT_COMMIT}\n\n Deploy URL:  ${env.BUILD_URL}\n\n Design by Harry Le", teamDomain: 'levinci', tokenCredentialId: 'slack'
			}
		}
		failure {
			script {
				slackSend channel: 'fnb', color: '#FF0000', message: "Hi\n Jenkins Notification\n\n Manually deploy by:  ${BUILD_TRIGGER_BY}\n Status Deploy Job:  ${currentBuild.result}\n\n Project Name:  ${env.JOB_NAME.replaceFirst('/.*', '')}              Build Number:  #${env.BUILD_NUMBER}                Branch Name:  ${env.BRANCH_NAME}\n Comitted by:  ${env.GIT_AUTHOR}\n Last commit message:  ${env.GIT_COMMIT_MSG}\n\n Commit Code: ${GIT_COMMIT}\n Commit URL: https://github.com/git-levinci/${env.JOB_NAME.replaceFirst('/.*', '')}/commit/${GIT_COMMIT}\n\n Deploy URL:  ${env.BUILD_URL}\n\n Design by Harry Le", teamDomain: 'levinci', tokenCredentialId: 'slack'
			}
		}
		aborted {
			script {
				slackSend channel: 'fnb', color: '#000000', message: "Hi\n Jenkins Notification\n\n Manually deploy by:  ${BUILD_TRIGGER_BY}\n Status Deploy Job:  ${currentBuild.result}\n\n Project Name:  ${env.JOB_NAME.replaceFirst('/.*', '')}              Build Number:  #${env.BUILD_NUMBER}                Branch Name:  ${env.BRANCH_NAME}\n Comitted by:  ${env.GIT_AUTHOR}\n Last commit message:  ${env.GIT_COMMIT_MSG}\n\n Commit Code: ${GIT_COMMIT}\n Commit URL: https://github.com/git-levinci/${env.JOB_NAME.replaceFirst('/.*', '')}/commit/${GIT_COMMIT}\n\n Deploy URL:  ${env.BUILD_URL}\n\n Design by Harry Le", teamDomain: 'levinci', tokenCredentialId: 'slack'
			}
		}
		unstable {
			script {
				slackSend channel: 'fnb', color: '#FFFF33', message: "Hi\n Jenkins Notification\n\n Manually deploy by:  ${BUILD_TRIGGER_BY}\n Status Deploy Job:  ${currentBuild.result}\n\n Project Name:  ${env.JOB_NAME.replaceFirst('/.*', '')}              Build Number:  #${env.BUILD_NUMBER}                Branch Name:  ${env.BRANCH_NAME}\n Comitted by:  ${env.GIT_AUTHOR}\n Last commit message:  ${env.GIT_COMMIT_MSG}\n\n Commit Code: ${GIT_COMMIT}\n Commit URL: https://github.com/git-levinci/${env.JOB_NAME.replaceFirst('/.*', '')}/commit/${GIT_COMMIT}\n\n Deploy URL:  ${env.BUILD_URL}\n\n Design by Harry Le", teamDomain: 'levinci', tokenCredentialId: 'slack'
			}
		}
    }
}
