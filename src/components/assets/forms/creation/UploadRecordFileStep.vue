<template>
  <div>
    <header class="creation-form__header">
      <h1>{{ $t('files') }}</h1>
      <p>
        {{ $t('files.add.description') }}
      </p>
    </header>
    <section class="form-creation__main container">
      <div
        v-if="filesLength < maxFileLength"
        :class="{'f-drag-and-drop--file-hover': fileHoveringDragAndDrop, 'f-drag-and-drop--sm': filesLength > 0}"
        class="f-drag-and-drop"
        @dragover.prevent="enteringDropArea($event)"
        @dragleave.prevent="leavingDropArea($event)"
        @drop.prevent="dropingFile($event)"
      >
        <div class="f-drag-and-drop__illustration">
          <svg
            width="64"
            height="78"
            viewBox="0 0 64 78"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
            >
              <path d="M-768-470H832V576H-768z" />
              <g
                stroke-width="2.64"
                stroke="#666"
              >
                <path d="M4.28 2.18106h55.44c1.45803 0 2.64 1.18197 2.64 2.64v68.64c0 1.45803-1.18197 2.64-2.64 2.64H4.28c-1.45803 0-2.64-1.18197-2.64-2.64v-68.64c0-1.45803 1.18197-2.64 2.64-2.64zM12.2 54.98106h39.6M12.2 61.91106h39.6M12.2 48.38106h39.6M12.2 41.78106h39.6M12.2 35.18106h39.6M12.2 28.58106H32" />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M43.88 2.18106l18.48 18.48H43.88z"
                />
              </g>
            </g>
          </svg>
        </div>
        <p class="f-drag-and-drop__label h4--ssp">
          {{ $t('file.upload.dragAndDrop') }}
        </p>
        <label
          for="fileinput"
          class="btn btn--light"
        >
          {{ $t('file.upload.chooseFile') }}
        </label>
        <input
          id="fileinput"
          multiple
          type="file"
          value="Escolher ficheiro"
          class="f-drag-and-drop__input sr-only"
          @change="filesSelected($event)"
        >
        <p>
          <small>
            {{ $t('file.upload.description') }}
          </small>
        </p>
      </div>
      <div
        v-else
        class="f-drag-and-drop f-drag-and-drop--xs f-drag-and-drop--disabled"
      >
        <p>
          {{ $t('record.create.maxFilesReached') }}
        </p>
      </div>
      <div class="doc-ulpoad-list">
        <div
          v-for="file in files"
          :key="file.id"
          class="card  doc-ulpoad-list__item"
        >
          <div class="card-row card-row--sm">
            <figure class="card-row__figure">
              <div
                v-if="file.state == 'uploading'"
                class="figure figure--icon doc-upload-list__item-spinner"
              >
                <svg
                  class="circular"
                  viewBox="25 25 50 50"
                >
                  <circle
                    class="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke-width="5"
                    stroke-miterlimit="10"
                  />
                </svg>
              </div>
              <div
                v-else-if="file.state == 'uploaded'"
                class="figure figure--icon"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    transform="translate(.25906 .19656)"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <circle
                      fill="#62D321"
                      cx="15.79886"
                      cy="15.79886"
                      r="15.79886"
                    />
                    <path
                      stroke="#FFF"
                      stroke-width="1.92"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9.36229 16.1371l5.21398 5.5834L22.23543 9.3623"
                    />
                  </g>
                </svg>
              </div>
              <div
                v-else-if="file.state == 'error'"
                class="figure figure--icon"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <circle
                      fill="#F9690E"
                      cx="16"
                      cy="16"
                      r="16"
                    />
                    <path
                      stroke="#FFF"
                      stroke-width="2.09524"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.54641 18.5892V8.03677M15.54641 23.37012v-.66667"
                    />
                  </g>
                </svg>
              </div>
            </figure>
            <div class="doc-upload-list__item-description">
              <div class="doc-upload-list__item-text">
                <h1 class="h5 doc-upload-list__item-title">
                  {{ file.name }}
                </h1>
                <p class="doc-upload-list__item-size">
                  {{ file.size | prettyBytes }}
                </p>
              </div>
              <div class="doc-upload-list__item-preferences">
                <div class="f-inline-group">
                  <div class="f-field f-field--sm f-field--hidden-label">
                    <input
                      id="filedescription"
                      v-model="file.description"
                      type="text"
                      class="f-field__input"
                      :placeholder="$t('file.description.placeholder')"
                    >
                    <label
                      for="filedescription"
                      class="f-field__label sr-only"
                    >{{ $t('type') }}</label>
                  </div>
                  <div class="f-field f-field--sm f-field--hidden-label">
                    <select
                      v-model="file.visibility"
                      class="f-field__input f-field__input--select"
                      name="filevisibility"
                    >
                      <option value="visible">
                        {{ $t('visible') }}
                      </option>
                      <option value="private">
                        {{ $t('private') }}
                      </option>
                    </select>
                    <label
                      class="f-field__label sr-only"
                      for="filevisibility"
                    >Visibilidade</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-row__meta doc-upload-list__item-meta">
              <dropdown>
                <button
                  slot="dropdown-trigger"
                  class="i-ellipsis"
                  aria-label="More options"
                />
                <template slot="dropdown-panel">
                  <ul class="dropdown-menu dropdown--xs">
                    <li class="dropdown-menu__item">
                      <button
                        class="dropdown-menu__link u-text-danger"
                        @click.prevent="removeFile({file})"
                      >
                        {{ $t('remove') }}
                      </button>
                    </li>
                  </ul>
                </template>
              </dropdown>
            </div>
          </div>
          <div
            v-if="file.state === 'error' && file.error.key"
            class="card-row card-row--sm"
          >
            <div class="doc-upload-list__item-validation">
              <p class="u-text-danger">
                <strong>Error:</strong> {{ file.error.key }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import UploadsAPI from '@/api/uploads'
import CryptoJS from 'crypto-js'
import Dropdown from '@/components/utils/Dropdown'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Dropdown
  },
  data () {
    return {
      maxFileLength: 5, // I don't how many should I allow
      fileHoveringDragAndDrop: false,
      fileInput: undefined,
      uploadedFileReference: undefined,
      uploadState: '',
      fileHash: undefined,
      fileResult: undefined,
      fileIsLoading: true
    }
  },
  computed: {
    ...mapState('record-creation', ['newRecord', 'files']),
    filesLength () {
      return Object.keys(this.files).length
    }
  },
  methods: {
    ...mapActions('record-creation', ['updateNextValid', 'updateFile', 'removeFile']),
    enteringDropArea (e) {
      this.fileHoveringDragAndDrop = true
    },
    leavingDropArea (e) {
      this.fileHoveringDragAndDrop = false
    },
    dropingFile (e) {
      this.fileHoveringDragAndDrop = false
      this.onDrop(e)
      return false
    },
    onDrop ($event) {
      $event.preventDefault()
      if ($event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < $event.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if ($event.dataTransfer.items[i].kind === 'file') {
            var file = $event.dataTransfer.items[i].getAsFile()
            this.processFile(file)
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < $event.dataTransfer.files.length; i++) {
          this.processFile(file)
        }
      }
    },
    filesSelected ($event) {
      for (const key in $event.target.files) {
        if ($event.target.files.hasOwnProperty(key)) {
          const file = $event.target.files[key]
          this.processFile(file)
        }
      }
    },
    processFile (file) {
      const reader = new FileReader()
      const that = this
      reader.onload = async function () {
        const fileWordArr = CryptoJS.lib.WordArray.create(this.result)
        const fileHash = CryptoJS.SHA256(fileWordArr).toString()
        const fileSize = file.size
        const fileObject = {
          name: file.name,
          size: fileSize,
          state: 'uploading',
          visibility: 'visible',
          description: '',
          id: Math.floor(Math.random() * 100000)
        }
        that.updateFile({ file: fileObject })
        const uploadSession = await UploadsAPI.createRecordUploadSession({ checksum: fileHash, fileSize })
        const upploadResult = await that.upload({ uploadSession, buffer: this.result, file })
        if (upploadResult.id) {
          fileObject.state = 'uploaded'
          that.updateFile({ file: fileObject })
        }
      }
      reader.readAsArrayBuffer(file)
    },
    async upload ({ uploadSession, buffer, file }) {
      if (uploadSession.challenges) {
        let challenges = []
        for (const c in uploadSession.challenges) {
          const chunk = buffer.slice(uploadSession.challenges[c].start, uploadSession.challenges[c].end + 1)
          const chunkChecksum = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(chunk)).toString()
          challenges.push(CryptoJS.SHA256(chunkChecksum + uploadSession.nonce).toString())
        }
        return UploadsAPI.resolveRecordUploadChallenges({ session: uploadSession.id, challenges })
      }
      let formData = new FormData()
      formData.append('file', file)
      return UploadsAPI.uploadRecordFile({ session: uploadSession.id, formData })
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/_variables.scss";
.doc-upload-list{
  margin-bottom: 1.5rem;
}
.doc-upload-list__item-description{
  display: flex;
  flex-flow: column wrap;
  flex-grow: 1;
  justify-content: space-between;
  @media screen and (min-width: 60rem){
    flex-flow: row nowrap;
    align-items: center;
  }
}
.doc-upload-list__item-text{
  margin-right: 1rem;
  margin-bottom: 1rem;
  @media screen and (min-width: 60rem){
    max-width: 50%;
    margin-bottom: 0;
  }
}
.doc-upload-list__item-preferences{
  margin-right: 0;
  // // this ensures the minimum value of the input so it breaks before
  @media screen and (min-width: 60rem){
    min-width: 26rem;
  }
}
.doc-upload-list__item-meta{
  align-self: flex-start;
  @media screen and (min-width: 60rem){
    align-self: center;
  }
}
.doc-upload-list__item-validation{
  padding-left: 3rem;
  margin-left: 1rem;
}

.doc-upload-list__item-title{
  margin-bottom: 0;
  word-break: break-all;
}
.doc-upload-list__item-spinner{
  position: relative;
  width: 3rem;
  height: 3rem;
  .circular{
    -webkit-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    -ms-transform-origin: center center;
    transform-origin: center center;
    width: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    stroke: $blue;
  }
  .path {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
}
@keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
</style>
