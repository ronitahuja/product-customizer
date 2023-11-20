import React, { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../index.css'

import 'bootstrap/dist/css/bootstrap.min.css';

function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/shoe.gltf')
  return (
    <group ref={useRef()} {...props} scale={3}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} material-color={props.customcolors.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={props.customcolors.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={props.customcolors.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={props.customcolors.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={props.customcolors.soul} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={props.customcolors.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} material-color={props.customcolors.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={props.customcolors.patch} />
    </group>
  )
}


function Home(args) {
  const [mesh, setmesh] = useState("#ffffff");
  const [strips, setstrips] = useState("#ffffff");
  const [laces, setlaces] = useState("#ffffff");
  const [caps, setcaps] = useState("#ffffff");
  const [inner, setinner] = useState("#ffffff");
  const [band, setband] = useState("#ffffff");
  const [patch, setpatch] = useState("#ffffff");
  const [soul, setsoul] = useState("#ffffff");

  const [modal, setModal] = useState(false);
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const toggle = () => setModal(!modal);

  function handleSubmit() {
    if (email == "" || phone == "") {
      alert("Incorrect details")
      return;
    }

    axios.post('https://product-customizer-backend.onrender.com/', {
      laces: laces,
      mesh: mesh,
      caps: caps,
      inner: inner,
      soul: soul,
      stripes: strips,
      band: band,
      patch: patch,
      email: email,
      phone: phone
    }).then(() => {
      toggle()
    }).catch((err) => {
      console.log(err)
    })
    alert("Your order has been placed")
  }

  const colors = {
    laces: laces,
    mesh: mesh,
    caps: caps,
    inner: inner,
    soul: soul,
    stripes: strips,
    band: band,
    patch: patch,
  }
  const variants = {
    start: {

    },
    end: {
      scale: 1.5,
    }
  }
  return (
    <>
      <div className="wrapper">
        <div className="card">
          <motion.div className="product-canvas" whileHover={{ scale: 1.2 }}>
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight />
                <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                <Model customcolors={colors} />
                <OrbitControls enablePan={true} enableRotate={true} enableZoom={true} />
              </Suspense>
            </Canvas>
          </motion.div>
          <h2>Color chooser</h2>
          <div className='colors'>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="mesh" name="mesh"
                value={mesh} onChange={(event) => {
                  setmesh(event.target.value);
                }} />
              <label htmlFor="mesh">Main</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="strips" name="strips"
                value={strips} onChange={(event) => {
                  setstrips(event.target.value);
                }} />
              <label htmlFor="strips">Stripes</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="soul" name="soul"
                value={soul} onChange={(event) => {
                  setsoul(event.target.value);
                }} />
              <label htmlFor="soul">Soul</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="laces" name="laces"
                value={laces} onChange={(event) => {
                  setlaces(event.target.value);
                }} />
              <label htmlFor="laces">Lace</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="inner" name="inner"
                value={inner} onChange={(event) => {
                  setinner(event.target.value);
                }} />
              <label htmlFor="inner">Inner</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="caps" name="caps"
                value={caps} onChange={(event) => {
                  setcaps(event.target.value);
                }} />
              <label htmlFor="caps">Caps</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="band" name="band"
                value={band} onChange={(event) => {
                  setband(event.target.value);
                }} />
              <label htmlFor="band">Band</label>
            </motion.div>
            <motion.div variants={variants} whileHover="end">
              <input type="color" id="patch" name="patch"
                value={patch} onChange={(event) => {
                  setpatch(event.target.value);
                }} />
              <label htmlFor="patch">Patch</label>
            </motion.div>
          </div>

          <Button color="danger" onClick={toggle} >
            Buy Now
          </Button>
          <Modal isOpen={modal} toggle={toggle} {...args}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              <input type="email" required placeholder="Enter your email"
                style={{ width: "30vw" }}
                onChange={(event) => {
                  setMail(event.target.value);
                }} />
              <input type="text" required placeholder="Enter your phone number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Please enter a valid phone number"
                style={{ width: "30vw", margin: "5px 0px 0px 0px" }}
                onChange={(event) => {
                  setPhone(event.target.value);
                }} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSubmit}>
                Confirm
              </Button>
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </>

  );
}

export default Home;
