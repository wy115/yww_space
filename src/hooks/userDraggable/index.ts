import { ref, reactive, onBeforeUnmount, onMounted, watchEffect } from 'vue';
import type { Ref } from 'vue';

interface InitialValue {
  offsetX: number;
  offsetY: number;
}
export const useDraggable = (
  targetRef: Ref<HTMLElement | undefined>,
  dragRef: Ref<HTMLElement | undefined>,
  draggable: Ref<boolean>,
  initialValue?: InitialValue
) => {
  const isMoved = ref(false); // 记录是否移动了

  const transform = reactive({
    offsetX: 0,
    offsetY: 0,
  });

  const onMousedown = (e: MouseEvent) => {
    isMoved.value = false;
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;
    const targetRect = targetRef.value!.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;

    const { clientWidth, clientHeight } = document.documentElement;

    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;

    const onMousemove = (moveEvent: MouseEvent) => {
      isMoved.value = true;
      const moveX = Math.min(
        Math.max(offsetX + moveEvent.clientX - downX, minLeft),
        maxLeft
      );
      const moveY = Math.min(
        Math.max(offsetY + moveEvent.clientY - downY, minTop),
        maxTop
      );

      transform.offsetX = moveX;
      transform.offsetY = moveY;
      targetRef.value!.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const onMouseup = () => {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('mouseup', onMouseup);
    };

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
  };
  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener('mousedown', onMousedown);
    }
  };

  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener('mousedown', onMousedown);
    }
  };

  const setInitialValue = () => {
    if (initialValue) {
      const { offsetX, offsetY } = initialValue;
      transform.offsetX = offsetX;
      transform.offsetY = offsetY;
      targetRef.value!.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  };

  onMounted(() => {
    watchEffect(() => {
      if (draggable.value) {
        setInitialValue();
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });

  onBeforeUnmount(() => {
    offDraggable();
  });

  return {
    isMoved,
    transform,
  };
};
