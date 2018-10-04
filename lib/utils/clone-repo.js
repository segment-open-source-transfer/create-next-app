const Promise = require('promise')
const mkdir = require('make-dir')
const output = require('./output')
const git = require('simple-git')

// Ensure the given repo exists
const validateRepoName = repoPath =>
  new Promise((resolve, reject) => {
    git().raw([`ls-remote`, repoPath], err => {
      // "err" is null unless this command failed
      // "result" is the raw output of this command
      if (err) {
        output.error(err)
        reject()
      } else {
        resolve()
      }
    })
  })

const clone = ({ projectName, repoPath }) =>
  new Promise((resolve, reject) => {
    // TODO...
    console.log(`In my custom clone() function, I would try to clone
        your repoPath: ${repoPath}, to: ${projectName}.
    `)

    // TODO: Make sure the clone() just uses the newly-made
    //  project directory (instead of creating a directory
    //  which matches the cloned repo name - which is default)

    reject()
    //resolve()
  })

module.exports = function cloneCustomRepo(opts) {
  const { projectName, repoPath } = opts
  const stopCloningSpinner = output.wait(
    `Cloning repo: ${output.cmd(repoPath)}`
  )
  return validateRepoName(repoPath)
    .then(() => mkdir(projectName))
    .then(() => clone({ projectName, repoPath }))
    .then(() => {
      stopCloningSpinner()
      output.success(
        `Cloned repo ${output.cmd(repoPath)} as your starting-point.`
      )
    })
    .catch(err => {
      stopCloningSpinner()
      output.error(`Error cloning: ${output.cmd(repoPath)}`)
      throw err
    })
}
