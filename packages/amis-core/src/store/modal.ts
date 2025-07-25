import {ServiceStore} from './service';
import {types, SnapshotIn, Instance, isAlive} from 'mobx-state-tree';
import {createObject} from '../utils/helper';

export const ModalStore = ServiceStore.named('ModalStore')
  .props({
    form: types.frozen(),
    entered: false,
    dragging: false,
    resizeCoord: 0,
    schema: types.frozen(),
    isFullscreen: false
  })
  .views(self => {
    return {
      get formData() {
        return createObject(self.data, self.form);
      },
      get inDragging() {
        return self.dragging;
      }
    };
  })
  .actions(self => {
    return {
      setEntered(value: boolean) {
        self.entered = value;
      },
      setDragging(value: boolean) {
        self.dragging = value;
      },
      setFormData(obj: any) {
        self.form = obj;
      },
      reset() {
        self.form = {};
        self.reInitData({}, true);
      },

      setResizeCoord(value: number) {
        self.resizeCoord = value;
      },

      setSchema(schema: any) {
        if (schema && schema.then) {
          schema.then(
            (value: any) => isAlive(self) && (self as any).setSchema(value)
          );
          return;
        }

        self.schema = schema;
      },
      setFullScreen(isFullscreen: boolean = false) {
        self.isFullscreen = isFullscreen;
      }
    };
  });

export type IModalStore = Instance<typeof ModalStore>;
export type SModalStore = SnapshotIn<typeof ModalStore>;
