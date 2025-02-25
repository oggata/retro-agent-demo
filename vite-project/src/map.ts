import { _OcclusionDataStorage } from "@babylonjs/core";
import { Scene } from "@babylonjs/core/scene.js";
import * as Main from './main.ts'
import * as Item from './item.ts';
import * as MMap from './mmap.ts';
import * as Npc from './npc.ts'
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { MeshBuilder } from "@babylonjs/core/";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
//import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
//import * as Score from './score.ts';

export var boxArray1: Mesh[] = [];
export var boxArray2: Mesh[] = [];
export var boxArray3: Mesh[] = [];
export var boxArray4: Mesh[] = [];
export var boxArray5: Mesh[] = [];
export var boxArray6: Mesh[] = [];
export var boxArray7: Mesh[] = [];
export var boxArray8: Mesh[] = [];

export function getMapData(id: number): any[] {
    if (id == 1) {
        return MMap.MAP_ARRAY2;
    } else if (id == 2) {
        return MMap.MAP_ARRAY2;
    } else if (id == 3) {
        return MMap.MAP_ARRAY3;
    } else if (id == 4) {
        return MMap.MAP_ARRAY4;
    } else if (id == 5) {
        return MMap.MAP_ARRAY5;
    } else if (id == 6) {
        return MMap.MAP_ARRAY6;
    } else if (id == 7) {
        return MMap.MAP_ARRAY7;
    } else if (id == 8) {
        return MMap.MAP_ARRAY8;
    } else if (id == 9) {
        return MMap.MAP_ARRAY9;
    } else {
        return MMap.MAP_ARRAY5;
    }
}

export function generateMap(scene: Scene) {
    var bid = 0;
    for (var row = 1; row <= Main.MAP_SIZE; row++) {
        for (var col = 1; col <= Main.MAP_SIZE; col++) {
            var type = Main.MAP_ARRAY[bid];
            addBox(type, bid, col, row, scene);
            bid++;
        }
    }

    //たかさごとにmesh化
    const combined1 = Mesh.MergeMeshes(boxArray1);
    const combined2 = Mesh.MergeMeshes(boxArray2);
    const combined3 = Mesh.MergeMeshes(boxArray3);
    const combined4 = Mesh.MergeMeshes(boxArray4);
    const combined5 = Mesh.MergeMeshes(boxArray5);
    const combined6 = Mesh.MergeMeshes(boxArray6);
    const combined7 = Mesh.MergeMeshes(boxArray7);
    const combined8 = Mesh.MergeMeshes(boxArray8);

    //配列に合成
    Main.combinedBoxArray.push(combined1!);
    Main.combinedBoxArray.push(combined2!);
    Main.combinedBoxArray.push(combined3!);
    Main.combinedBoxArray.push(combined4!);
    Main.combinedBoxArray.push(combined5!);
    Main.combinedBoxArray.push(combined6!);
    Main.combinedBoxArray.push(combined7!);
    Main.combinedBoxArray.push(combined8!);

    //リセット
    boxArray1 = [];
    boxArray2 = [];
    boxArray3 = [];
    boxArray4 = [];
    boxArray5 = [];
    boxArray6 = [];
    boxArray7 = [];
    boxArray8 = [];

    Main.setFirstTargetNums();

    for (var k = 0; k < Main.NPC_COUNT; k++) {
        Npc.createNPC(scene, 1); //human
    }
    for (var k = 0; k < Main.ENEMY_COUNT; k++) {
        Npc.createNPC(scene, 5); //sai
        Npc.createNPC(scene, 2); //yagi
    }
    for (var k = 0; k < Main.ITEM_COUNT; k++) {
        Item.createItem(scene, 1); //tree
    }
}

export function addBox(type: number, bid: number, col: number, row: number, scene: Scene) {
    //boxを生成
    var objectHight = type / 3;
    var box = MeshBuilder.CreateBox("box", { width: 1, height: objectHight, depth: 1 });
    box.position.x = col;
    box.position.z = row;
    box.name = "xxxxx" + col;
    box.position.y = objectHight / 2;

    //merge meshするために個々の配列に保管
    if (type == 1) {
        boxArray1.push(box);
    }
    if (type == 2) {
        boxArray2.push(box);
    }
    if (type == 3) {
        boxArray3.push(box);
    }
    if (type == 4) {
        boxArray4.push(box);
    }
    if (type == 5) {
        boxArray5.push(box);
    }
    if (type == 6) {
        boxArray6.push(box);
    }
    if (type == 7) {
        boxArray7.push(box);
    }
    if (type == 8) {
        boxArray8.push(box);
    }

    const b = {
        bid: bid,
        type: type,
        h: objectHight,
        col: col,
        row: row
    };
    Main.chipArray.push(b);

    const Material1 = new StandardMaterial("material", scene);
    Material1.diffuseColor = Color3.FromHexString('#4DA1A9');

    const Material2 = new StandardMaterial("material", scene);
    Material2.diffuseColor = Color3.FromHexString('#79D7BE');

    const Material3 = new StandardMaterial("material", scene);
    Material3.diffuseColor = Color3.Blue();
    Material3.diffuseColor = Color3.FromHexString('#FFF1DB');

    const Material4 = new StandardMaterial("material", scene);
    Material4.diffuseColor = Color3.FromHexString('#D4BDAC');

    const Material5 = new StandardMaterial("material", scene);
    Material5.diffuseColor = Color3.FromHexString('#E4F1AC');

    const Material6 = new StandardMaterial("material", scene);
    Material6.diffuseColor = Color3.FromHexString('#A7D477');

    const Material7 = new StandardMaterial("material", scene);
    Material7.diffuseColor = Color3.FromHexString('#62825D');

    const Material8 = new StandardMaterial("material", scene);
    Material8.diffuseColor = Color3.FromHexString('#3C552D');

    if (b.type == 1) {
        box.material = Material1;
    } else if (b.type == 2) {
        box.material = Material2;
    } else if (b.type == 3) {
        box.material = Material3;
    } else if (b.type == 4) {
        box.material = Material4;
    } else if (b.type == 5) {
        box.material = Material5;
    } else if (b.type == 6) {
        box.material = Material6;
    } else if (b.type == 7) {
        box.material = Material7;
    } else if (b.type == 8) {
        box.material = Material8;
    } else {
        box.material = Material3;
    }
}
