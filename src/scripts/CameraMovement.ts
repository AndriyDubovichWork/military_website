import { Behaviour, serializable, Text } from '@needle-tools/engine';
import { Object3D, Vector3 } from 'three';

export class CameraMovement extends Behaviour {
	cameraPositions: Vector3[] = [];

	canvasPositions: Vector3[] = [];

	movementSpeed: number = 1;

	canvas?: Object3D;

	textArray: string[] = [];

	@serializable(Text)
	textObject?: Text;

	@serializable(Text)
	tryToScroll?: Text;

	private mCurrentIndex: number = 0;

	changeText() {
		if (this.textObject) {
			this.textObject.text = `${this.textArray[this.mCurrentIndex]}`;
		}
		if (this.mCurrentIndex === 0 && this.tryToScroll) {
			this.tryToScroll.text = 'try to scroll';
		} else if (this.mCurrentIndex !== 0 && this.tryToScroll) {
			this.tryToScroll.text = '';
		}
	}

	roundDecimal(num) {
		return Math.round(num * 10) / 10;
	}

	containsObject(obj, list) {
		for (let i = 0; i < list.length; i++) {
			if (
				this.roundDecimal(list[i].x) === this.roundDecimal(obj.x) &&
				this.roundDecimal(list[i].y) === this.roundDecimal(obj.y) &&
				this.roundDecimal(list[i].z) === this.roundDecimal(obj.z)
			) {
				return true;
			}
		}

		return false;
	}
	changeMIndex() {
		if (
			this.context.input.getMouseWheelDeltaY() > 0 &&
			this.containsObject(this.gameObject.position, this.cameraPositions)
		) {
			if (this.mCurrentIndex < this.cameraPositions.length - 1) {
				this.mCurrentIndex++;
			}
		}

		if (
			this.context.input.getMouseWheelDeltaY() < 0 &&
			this.containsObject(this.gameObject.position, this.cameraPositions)
		) {
			if (this.mCurrentIndex > 0) {
				this.mCurrentIndex--;
			}
		}
	}

	moveCanvas() {
		//set canvas position

		this.canvas?.position.lerpVectors(
			this.canvas?.position,
			this.canvasPositions[this.mCurrentIndex],
			this.movementSpeed * this.context.time.deltaTime
		);

		// this.canvas?.position.setX(this.canvasPositions[this.mCurrentIndex].x);
		// this.canvas?.position.setY(this.canvasPositions[this.mCurrentIndex].y);
		// this.canvas?.position.setZ(this.canvasPositions[this.mCurrentIndex].z);

		// rotate canvas
		this.canvas?.lookAt(new Vector3(0, 1.3, 0));
	}
	changeCanvasScale() {
		if (window.screen.width < 400) {
			this.canvas?.scale.setX(0.0025);
			this.canvas?.scale.setY(0.0025);
		} else if (window.screen.width < 600) {
			this.canvas?.scale.setX(0.0035);
			this.canvas?.scale.setY(0.0035);
		} else if (window.screen.width < 800) {
			this.canvas?.scale.setX(0.005);
			this.canvas?.scale.setY(0.005);
		} else if (window.screen.width < 1000) {
			this.canvas?.scale.setX(0.006);
			this.canvas?.scale.setY(0.006);
		} else if (window.screen.width < 1200) {
			this.canvas?.scale.setX(0.007);
			this.canvas?.scale.setY(0.007);
		} else if (window.screen.width < 1400) {
			this.canvas?.scale.setX(0.008);
			this.canvas?.scale.setY(0.008);
		} else {
			this.canvas?.scale.setX(0.01);
			this.canvas?.scale.setY(0.01);
		}
	}
	moveCamera() {
		// move from current position to next position with smooth effect

		this.gameObject.position.lerpVectors(
			this.gameObject.position,
			this.cameraPositions[this.mCurrentIndex],
			this.movementSpeed * this.context.time.deltaTime
		);
		// camera look at specific point
		this.gameObject.transform.lookAt(new Vector3(0, 1.3, 0));
	}
	update() {
		// if scroll change camera position

		this.changeMIndex();

		this.moveCamera();

		this.moveCanvas();

		this.changeCanvasScale();

		this.changeText();
	}
}
