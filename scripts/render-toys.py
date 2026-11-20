"""Render the plush bear for the home page story. Usage:
   blender -b -P bear.py -- <mode: bear|tag|flat> <out.png> [resolution] [samples]
"""
import math, sys
import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
MODE, OUT = argv[0], argv[1]
RES = int(argv[2]) if len(argv) > 2 else 1200
SAMPLES = int(argv[3]) if len(argv) > 3 else 96
FLAT = MODE == "flat"
ANIMAL = argv[4] if len(argv) > 4 else "bear"

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def srgb(hex_):
    h = hex_.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c] + [1]

HONEY, CREAM, PERSIMMON, INK, PAPER = srgb("#c8862a"), srgb("#f6e3bd"), srgb("#ff4a1c"), srgb("#1b1512"), srgb("#fff5e1")

def fur_material(name, colour):
    m = bpy.data.materials.new(name); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    hair = nt.nodes.new("ShaderNodeBsdfHairPrincipled")
    hair.parametrization = "COLOR"
    hair.inputs["Color"].default_value = colour
    for key, value in (("Roughness", 0.55), ("Radial Roughness", 0.7)):
        if key in hair.inputs: hair.inputs[key].default_value = value
    for key, value in (("Random Color", 0.12), ("Random Roughness", 0.2)):
        if key in hair.inputs: hair.inputs[key].default_value = value
    nt.links.new(hair.outputs[0], out.inputs["Surface"])
    return m

def cloth_material(name, colour, rough=0.9, sheen=0.6):
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes["Principled BSDF"]
    b.inputs["Base Color"].default_value = colour
    b.inputs["Roughness"].default_value = rough
    b.inputs["Sheen Weight"].default_value = sheen
    return m

# Coat and accent colour per toy. The part() calls below still name them "honey" and "cream".
COAT, ACCENT = {"bear": (HONEY, CREAM), "lamb": (srgb("#f3e9d6"), srgb("#e3bf93")), "bunny": (srgb("#aaa49d"), srgb("#f1b3bd"))}[ANIMAL]
HONEY, CREAM = COAT, ACCENT
PINK = srgb("#e58a98")
fur = {"honey": fur_material("fur-honey", HONEY), "cream": fur_material("fur-cream", CREAM)}
skin = {"honey": cloth_material("skin-honey", [c * 0.7 for c in HONEY[:3]] + [1]), "cream": cloth_material("skin-cream", [c * 0.8 for c in CREAM[:3]] + [1])}
ribbon = cloth_material("ribbon", PERSIMMON, 0.55, 0.3)
thread = cloth_material("thread", INK, 0.8, 0.4)
glass = cloth_material("eye", INK, 0.08, 0)

def part(name, loc, scale, rot=(0, 0, 0), colour="honey", length=0.05, density=3400, spread=(0, 0)):
    """A stuffed ellipsoid with a coat of plush. In flat mode it is pressed thin and slid outwards, like a cut piece."""
    loc = Vector(loc)
    if FLAT:
        loc = Vector((loc.x + spread[0], 0, loc.z + spread[1]))
        scale = (scale[0] if abs(rot[1]) < 0.01 else scale[0], 0.045, scale[2] if scale[1] < scale[2] * 1.5 else scale[1])
    bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=32, location=loc, rotation=rot)
    ob = bpy.context.object; ob.name = name
    ob.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    bpy.ops.object.shade_smooth()
    ob.data.materials.append(skin[colour]); ob.data.materials.append(fur[colour])
    area = sum(p.area for p in ob.data.polygons)
    ps = ob.modifiers.new("fur", "PARTICLE_SYSTEM").particle_system.settings
    ps.type = "HAIR"; ps.count = int(area * density)
    ps.hair_length = length * (0.75 if FLAT else 1); ps.hair_step = 4
    ps.length_random = 0.35
    ps.child_type = "INTERPOLATED"; ps.rendered_child_count = 36; ps.child_percent = 4
    ps.clump_factor = 0.25; ps.clump_shape = 0.2
    ps.roughness_1 = 0.035; ps.roughness_1_size = 0.6; ps.roughness_endpoint = 0.07; ps.roughness_2 = 0.03
    ps.child_length = 1; ps.brownian_factor = 0.02
    ps.root_radius = 0.9; ps.tip_radius = 0.25; ps.radius_scale = 0.008
    ps.material = 2
    if ANIMAL == "lamb" and colour == "honey":
        # Wool: longer, curled and clumped into tufts.
        ps.hair_length = 0.085 * (0.75 if FLAT else 1); ps.hair_step = 6
        ps.kink = "CURL"; ps.kink_amplitude = 0.022; ps.kink_frequency = 3.5
        ps.clump_factor = 0.75; ps.roughness_endpoint = 0.03
    ps.use_hair_bspline = True
    if hasattr(ps, "render_step"): ps.render_step = 3
    return ob

def solid(name, loc, scale, mat, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, location=loc, rotation=rot)
    ob = bpy.context.object; ob.name = name; ob.scale = scale
    bpy.ops.object.shade_smooth(); ob.data.materials.append(mat)
    return ob

# The bear, sitting, facing -Y.
part("body", (0, 0, 0.78), (0.64, 0.54, 0.74), spread=(0, -0.18))
part("head", (0, -0.02, 1.80), (0.60, 0.52, 0.52), spread=(0, 0.22))
if ANIMAL == "bear":
    part("ear-l", (-0.46, 0.02, 2.22), (0.21, 0.11, 0.21), spread=(-0.34, 0.42))
    part("ear-r", (0.46, 0.02, 2.22), (0.21, 0.11, 0.21), spread=(0.34, 0.42))
elif ANIMAL == "lamb":
    for sx in (-1, 1):
        part("ear", (sx * 0.68, -0.02, 1.84), (0.25, 0.07, 0.12), rot=(0, math.radians(sx * 28), 0), colour="cream", length=0.025, density=3600, spread=(sx * 0.4, 0.5))
else:
    for sx in (-1, 1):
        part("ear", (sx * 0.25, 0.04, 2.66), (0.135, 0.075, 0.5), rot=(0, math.radians(sx * 9), 0), spread=(sx * 0.42, 0.5))
        if not FLAT:
            part("ear-in", (sx * 0.25, -0.03, 2.66), (0.075, 0.03, 0.38), rot=(0, math.radians(sx * 9), 0), colour="cream", length=0.02, density=3600)
part("arm-l", (-0.70, -0.14, 0.92), (0.21, 0.21, 0.46), rot=(0.3, math.radians(28), 0), spread=(-0.5, 0.05))
part("arm-r", (0.70, -0.14, 0.92), (0.21, 0.21, 0.46), rot=(0.3, math.radians(-28), 0), spread=(0.5, 0.05))
if FLAT:
    part("leg-l", (-0.40, 0, 0.10), (0.25, 0.25, 0.44), rot=(0, math.radians(-12), 0), spread=(-0.32, -0.62))
    part("leg-r", (0.40, 0, 0.10), (0.25, 0.25, 0.44), rot=(0, math.radians(12), 0), spread=(0.32, -0.62))
else:
    part("leg-l", (-0.40, -0.52, 0.27), (0.26, 0.46, 0.26), rot=(0, 0, math.radians(-14)))
    part("leg-r", (0.40, -0.52, 0.27), (0.26, 0.46, 0.26), rot=(0, 0, math.radians(14)))
    if ANIMAL == "lamb":
        part("face", (0, -0.40, 1.76), (0.37, 0.25, 0.32), colour="cream", length=0.02, density=3800)
    else:
        part("muzzle", (0, -0.44, 1.66), (0.25, 0.17, 0.19), colour="cream" if ANIMAL == "bear" else "honey", length=0.04, density=3600)
    part("pad-l", (-0.50, -0.95, 0.28), (0.17, 0.04, 0.17), rot=(0, 0, math.radians(-14)), colour="cream", length=0.03, density=3600)
    part("pad-r", (0.50, -0.95, 0.28), (0.17, 0.04, 0.17), rot=(0, 0, math.radians(14)), colour="cream", length=0.03, density=3600)
    if ANIMAL == "bear":
        part("ear-in-l", (-0.46, -0.07, 2.21), (0.12, 0.04, 0.12), colour="cream", length=0.03, density=3600)
        part("ear-in-r", (0.46, -0.07, 2.21), (0.12, 0.04, 0.12), colour="cream", length=0.03, density=3600)
    EYE_Y = -0.60 if ANIMAL == "lamb" else -0.515
    solid("eye-l", (-0.2, EYE_Y, 1.88), (0.068, 0.06, 0.068), glass)
    solid("eye-r", (0.2, EYE_Y, 1.88), (0.068, 0.06, 0.068), glass)
    solid("nose", (0, -0.655, 1.72), (0.09, 0.055, 0.065) if ANIMAL == "bear" else (0.065, 0.05, 0.05), thread if ANIMAL == "bear" else cloth_material("nose", PINK, 0.7, 0.5))
    # Embroidered mouth: one stitch down from the nose, then a small smile.
    cu = bpy.data.curves.new("mouth", "CURVE"); cu.dimensions = "3D"; cu.bevel_depth = 0.014
    for pts in ([(0, -0.675, 1.67), (0, -0.665, 1.60)], [(-0.085, -0.64, 1.625), (-0.04, -0.662, 1.59), (0, -0.666, 1.60), (0.04, -0.662, 1.59), (0.085, -0.64, 1.625)]):
        sp = cu.splines.new("POLY"); sp.points.add(len(pts) - 1)
        for p, co in zip(sp.points, pts): p.co = (*co, 1)
    mouth = bpy.data.objects.new("mouth", cu); scene.collection.objects.link(mouth); cu.materials.append(thread)
    # A persimmon ribbon at the neck.
    bpy.ops.mesh.primitive_torus_add(major_radius=0.40, minor_radius=0.065, location=(0, -0.03, 1.36), major_segments=64, minor_segments=24)
    band = bpy.context.object; band.scale = (1, 0.92, 0.75); bpy.ops.object.shade_smooth(); band.data.materials.append(ribbon)
    for sx in (-1, 1):
        solid("bow", (sx * 0.15, -0.44, 1.33), (0.15, 0.05, 0.10), ribbon, rot=(0, math.radians(sx * 18), 0))
    solid("knot", (0, -0.46, 1.34), (0.055, 0.05, 0.06), ribbon)
    if MODE == "tag":
        # Swing tag on a thread from the ear.
        bpy.ops.mesh.primitive_cube_add(location=(0.93, -0.30, 1.72), rotation=(math.radians(8), math.radians(-14), math.radians(6)))
        tag = bpy.context.object; tag.scale = (0.17, 0.006, 0.24)
        tag.data.materials.append(cloth_material("card", PAPER, 0.75, 0))
        bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=0.006, location=(0.925, -0.312, 1.70), rotation=(math.radians(98), 0, 0))
        bpy.context.object.data.materials.append(ribbon)
        sc = bpy.data.curves.new("string", "CURVE"); sc.dimensions = "3D"; sc.bevel_depth = 0.006
        sp = sc.splines.new("BEZIER"); sp.bezier_points.add(1)
        a, b = sp.bezier_points
        a.co = {"bear": (0.52, -0.02, 2.14), "lamb": (0.78, -0.04, 1.90), "bunny": (0.36, -0.02, 2.30)}[ANIMAL]; a.handle_left = a.co; a.handle_right = (0.80, -0.20, 2.25)
        b.co = (0.90, -0.30, 1.93); b.handle_left = (0.95, -0.28, 2.12); b.handle_right = b.co
        so = bpy.data.objects.new("string", sc); scene.collection.objects.link(so); sc.materials.append(thread)

# Ground (or, for the flat pieces, the table they lie on) that only receives shadows.
if FLAT:
    bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 0.05, 1), rotation=(math.radians(90), 0, 0))
else:
    bpy.ops.mesh.primitive_plane_add(size=30, location=(0, 0, 0))
bpy.context.object.is_shadow_catcher = True

def light(loc, energy, size, colour=(1, 1, 1)):
    d = bpy.data.lights.new("l", "AREA"); d.energy = energy; d.size = size; d.color = colour
    o = bpy.data.objects.new("l", d); scene.collection.objects.link(o); o.location = loc
    o.rotation_euler = (Vector((0, 0, 1.2)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()

if FLAT:
    light((-2.5, -6, 4.5), 520, 5); light((3, -6, 0), 140, 6)
else:
    light((-3.2, -4.5, 5.2), 620, 4.5, (1, 0.97, 0.92)); light((4.5, -3.5, 2.2), 150, 6, (0.95, 0.97, 1)); light((1.5, 4.5, 4.5), 500, 3)

world = bpy.data.worlds.new("w"); scene.world = world; world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = PAPER
world.node_tree.nodes["Background"].inputs[1].default_value = 0.35

cam = bpy.data.cameras.new("cam"); cam.lens = 90
co = bpy.data.objects.new("cam", cam); scene.collection.objects.link(co); scene.camera = co
target = Vector((0, 0, 1.13 if not FLAT else 0.95))
co.location = (0, -11.5, 1.13 + 1.3) if not FLAT else (0, -11.5, 0.95)
co.rotation_euler = (target - co.location).to_track_quat("-Z", "Y").to_euler()
if FLAT:
    cam.type = "ORTHO"; cam.ortho_scale = 4.4

scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"; scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.use_adaptive_sampling = True; scene.cycles.adaptive_threshold = 0.03
scene.cycles_curves.shape = "RIBBONS"
scene.render.film_transparent = True
scene.render.resolution_x = RES; scene.render.resolution_y = int(RES * 1.12)
scene.view_settings.view_transform = "Standard"
scene.render.image_settings.file_format = "PNG"; scene.render.image_settings.color_mode = "RGBA"
scene.render.threads_mode = "FIXED"; scene.render.threads = 7
scene.render.filepath = OUT
bpy.ops.render.render(write_still=True)
