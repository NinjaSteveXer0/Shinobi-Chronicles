// ============================================================================
// ISSUE #190 — FINAL WRITING PRESENTATION LOCALISATION — 35520
//
// Localises the expression-only Writing-final pass in 33600. English remains
// canonical. This module registers presentation strings only and owns no Story
// transitions, choices, facts, progression, Battle, Rank or PL semantics.
// ============================================================================
(function installAlphaLocalisationFinalWriting35520(){
"use strict";
if(globalThis.SC_ALPHA_LOCALISATION_FINAL_WRITING_35520)return;
const core=globalThis.SC_ALPHA_LOCALISATION_35500;
if(!core||typeof core.registerLocaleMessages!=="function")throw new Error("alpha_localisation_35500_required");
const PATCH_ID="alpha_localisation_final_writing_35520_v1_2026_09_17";
const pairs=[];
const add=(en,es)=>pairs.push([en,es]);

// Hinata — final #170 presentation.
add("Dawn has barely reached the Hyūga compound when Hinata's palms begin to sting. The same form. Again. Feet placed exactly where they were placed yesterday. The instructor watches her finish it without comment, then steps aside and calls another student forward. ‘Enough repetition. Show me what you do when the other person moves.’","El amanecer apenas ha alcanzado el complejo Hyūga cuando las palmas de Hinata empiezan a arder. La misma forma. Otra vez. Los pies exactamente donde estuvieron ayer. El instructor la ve terminar sin comentar nada, luego se aparta y llama a otro estudiante. ‘Basta de repetir. Muéstrame qué haces cuando la otra persona se mueve.’");
add("Her opponent settles into stance. Hinata can feel the familiar urge to wait until she is completely certain. The instructor is already watching.","Su oponente adopta la postura. Hinata siente el impulso conocido de esperar hasta estar completamente segura. El instructor ya está observando.");
add("Move first. Don't give them the tempo.","Muévete primero. No le cedas el ritmo.");
add("Let them show the opening.","Deja que muestre la apertura.");
add("Make them come through her guard.","Haz que tenga que atravesar su guardia.");
add("Watch the shoulders and feet before committing.","Observa hombros y pies antes de comprometerte.");
add("The first exchange breaks the neat Academy rhythm. Her opponent adjusts. So does Hinata.","El primer intercambio rompe el ritmo ordenado de la Academia. Su oponente se ajusta. Hinata también.");
add("One clean opening appears—and begins to close.","Aparece una apertura limpia y empieza a cerrarse.");
add("At the compound gate, a younger Hyūga student is still trying the same turn of the hip. They stop the instant they realise Hinata has noticed.","En la entrada del complejo, un estudiante Hyūga más joven sigue intentando el mismo giro de cadera. Se detiene en cuanto nota que Hinata se ha dado cuenta.");
add("Show them once. Slowly.","Muéstraselo una vez. Despacio.");
add("Tell them where the movement is going wrong.","Dile dónde está fallando el movimiento.");
add("Leave them the space to work it out.","Déjale espacio para resolverlo.");
add("Stay long enough to see what they're missing.","Quédate el tiempo suficiente para ver qué le falta.");
add("Tomorrow... I'll do it cleaner.","Mañana... lo haré mejor.");

// Wasabi Izuno.
add("The Academy target gets a head start and vanishes into the village training routes. A flare at the extraction point marks the only thing Wasabi knows for certain: if it goes up before she gets there, she was too slow—or followed the wrong story.","El objetivo de la Academia sale con ventaja y desaparece entre las rutas de entrenamiento de la aldea. Una bengala en el punto de extracción marca lo único que Wasabi sabe con certeza: si se enciende antes de que llegue, fue demasiado lenta o siguió la pista equivocada.");
add("The obvious trail is almost too obvious. Scuffed dirt points east. A snapped reed points toward the drainage path. Two other students are already arguing over which one matters.","El rastro evidente es casi demasiado evidente. La tierra rozada apunta al este. Un junco roto apunta hacia el canal de drenaje. Otros dos estudiantes ya discuten sobre cuál importa.");
add("Take the trail at face value and move.","Tomar el rastro tal como parece y avanzar.");
add("Check what the environment says before trusting footprints.","Comprobar qué dice el entorno antes de confiar en las huellas.");
add("Use the other students instead of racing them.","Usar a los otros estudiantes en vez de competir contra ellos.");
add("Forget the trail. Predict the extraction route.","Olvidar el rastro. Predecir la ruta de extracción.");
add("A second set of signs appears and the pursuit stops being clean. Wasabi has enough information to commit—but not enough to know she is right.","Aparece un segundo conjunto de señales y la persecución deja de ser clara. Wasabi tiene suficiente información para decidir, pero no para saber que tiene razón.");
add("Another Academy student skids into view with a Rogue Genin crowding their escape. That is not part of the trial. The target is still moving.","Otro estudiante de la Academia aparece derrapando mientras un Genin renegado le corta la huida. Eso no forma parte de la prueba. El objetivo sigue moviéndose.");
add("Next time, commit faster.","La próxima vez, decidir más rápido.");
add("Next time, trust what I notice before what they leave for me.","La próxima vez, confiar en lo que noto antes que en lo que dejan para mí.");
add("The obvious route is obvious for a reason—and that's the problem.","La ruta evidente es evidente por una razón, y ese es el problema.");
add("Catching the target wasn't the only thing happening out there.","Atrapar al objetivo no era lo único que estaba ocurriendo ahí fuera.");
add("Wasabi drops back onto the village route at a jog, already replaying the turns she trusted and the ones she didn't.","Wasabi vuelve a la ruta de la aldea al trote, repasando ya los giros en los que confió y aquellos en los que no.");

// Mirai.
add("The escort begins badly only in hindsight. The civilian is polite, knows the route, thanks Mirai for walking on the road-side of the path and asks ordinary questions about the Academy. Nothing about them demands suspicion.","La escolta solo parece haber empezado mal al mirarla en retrospectiva. El civil es educado, conoce la ruta, agradece a Mirai que camine del lado de la carretera y hace preguntas normales sobre la Academia. Nada exige sospechar.");
add("Conversation fills the walk. Mirai asks something ordinary—not because she is interrogating them, but because silence for the whole escort would be strange.","La conversación llena el trayecto. Mirai pregunta algo normal, no porque esté interrogando, sino porque guardar silencio durante toda la escolta sería extraño.");
add("Stop them and ask directly.","Detenerlo y preguntar directamente.");
add("Ask again from a different angle.","Preguntar otra vez desde otro ángulo.");
add("Act like she didn't notice. Watch what changes.","Actuar como si no lo hubiera notado. Observar qué cambia.");
add("Change the route without warning and see how they react.","Cambiar la ruta sin avisar y ver cómo reacciona.");
add("At the checkpoint the transformation releases. The person Mirai protected is still standing exactly where she delivered them—safe, cooperative and not the person she thought she was escorting. For one ugly second, both facts are true at once.","En el punto de control se deshace la transformación. La persona que Mirai protegió sigue exactamente donde la entregó: a salvo, cooperativa y no es quien Mirai creía estar escoltando. Durante un segundo incómodo, ambos hechos son ciertos a la vez.");
add("Mirai never accuses them. She changes one question, then one route detail, then watches the answer arrive half a beat too late. By the time she acts, she has enough to expose the substitution without pretending she knows who is underneath it.","Mirai nunca acusa. Cambia una pregunta, luego un detalle de la ruta, y observa cómo la respuesta llega medio instante tarde. Cuando actúa, tiene suficiente para exponer la sustitución sin fingir que sabe quién hay debajo.");
add("The instructor waits until Mirai has reconstructed the route herself. Protection and identification turned out to be two different jobs.","El instructor espera hasta que Mirai reconstruye la ruta por sí misma. Proteger e identificar resultaron ser dos trabajos distintos.");
add("You kept your client alive. Next time, make sure the client is the person you were assigned.","Mantuviste con vida a tu cliente. La próxima vez, asegúrate de que sea la persona que te asignaron.");

// Kushina.
add("The practice formula should have gone dark three strokes ago. Instead, chakra crawls past the boundary line and snaps across the courtyard stone toward the student kneeling beside it. The instructor moves—but Kushina is closer.","La fórmula de práctica debería haberse apagado hace tres trazos. En cambio, el chakra rebasa la línea de contención y salta por la piedra del patio hacia el estudiante arrodillado junto a ella. El instructor se mueve, pero Kushina está más cerca.");
add("Fix the formula before it tears itself apart.","Arreglar la fórmula antes de que se desgarre por completo.");
add("Get the student out first.","Sacar primero al estudiante.");
add("Close the broken boundary around the leak.","Cerrar el límite roto alrededor de la fuga.");
add("Move the damned scroll somewhere empty.","Mover el maldito pergamino a un lugar vacío.");

// Kurenai.
add("A brass bell hangs from the instructor's belt. No weapons. No spectators. One rule. “Take it.”","Una campana de latón cuelga del cinturón del instructor. Sin armas. Sin espectadores. Una regla. “Tómala.”");
add("Kurenai watches the instructor's eyes instead of the bell. If he believes the first lie, the second one will not need to be bigger—only better placed.","Kurenai observa los ojos del instructor en vez de la campana. Si cree la primera mentira, la segunda no tendrá que ser mayor, solo estar mejor colocada.");
add("Give him a Kurenai he can see.","Darle una Kurenai que pueda ver.");
add("Hide the real movement behind the obvious one.","Ocultar el movimiento real detrás del evidente.");
add("Make distance lie.","Hacer que la distancia mienta.");
add("Let him believe she came straight at him.","Dejar que crea que ella fue directamente hacia él.");
add("His eyes follow the false Kurenai exactly where she wanted them. The question is whether she spends that belief now.","Sus ojos siguen a la Kurenai falsa exactamente donde ella quería. La pregunta es si aprovecha esa creencia ahora.");
add("The instructor tracks the movement he can see. The real movement stays somewhere else.","El instructor sigue el movimiento que puede ver. El movimiento real permanece en otro lugar.");
add("For one beat, the bell looks unguarded enough to be real.","Durante un instante, la campana parece lo bastante desprotegida como para ser real.");
add("The distance between Kurenai and the bell stops agreeing with what the instructor thinks he saw.","La distancia entre Kurenai y la campana deja de coincidir con lo que el instructor cree haber visto.");
add("He starts to dismiss the attempt. That certainty is another surface she can use.","Empieza a descartar el intento. Esa certeza es otra superficie que ella puede usar.");
add("He sees exactly what she offered him: a clumsy direct approach.","Ve exactamente lo que ella le ofreció: un enfoque directo y torpe.");
add("He believes he has caught her. Kurenai lets the belief settle before touching it.","Cree que la ha atrapado. Kurenai deja que esa creencia se asiente antes de tocarla.");
add("The illusion peels away in the order Kurenai built it. For a moment the courtyard contains the bell, the instructor, and the version of the exchange he thought happened. Then only the real positions remain.","La ilusión se desprende en el orden en que Kurenai la construyó. Durante un momento, el patio contiene la campana, al instructor y la versión del intercambio que él creyó que ocurrió. Luego solo quedan las posiciones reales.");
add("Genjutsu isn't making someone see something strange. It's deciding which part of reality they stop checking.","Genjutsu no consiste en hacer que alguien vea algo extraño. Consiste en decidir qué parte de la realidad deja de comprobar.");

// Iwabee.
add("Make it usable.","Haz que sea utilizable.");
add("Half the training ground has slumped after a failed Earth Release exercise. One lane is cracked, one wall is leaning and everyone has spent five minutes explaining why it is somebody else's fault. Iwabee looks at the ground once. Written tests take him forever. This does not.","La mitad del campo de entrenamiento se ha hundido tras un ejercicio fallido de Elemento Tierra. Un carril está agrietado, un muro se inclina y todos llevan cinco minutos explicando por qué es culpa de otro. Iwabee mira el suelo una vez. Los exámenes escritos le llevan una eternidad. Esto no.");
add("The Rogue Genin glances from Iwabee to the open route. The training problem just became somebody else's real problem too.","El Genin renegado mira de Iwabee a la ruta abierta. El problema de entrenamiento acaba de convertirse también en el problema real de otra persona.");
add("Iwabee looks from the repaired ground to the mess the unexpected Genin left behind. What part of the assessment matters to him?","Iwabee mira del terreno reparado al desastre que dejó el Genin inesperado. ¿Qué parte de la evaluación le importa?");
add("Iwabee looks back once at the ground he repaired and at whatever his choice about the Rogue Genin left behind, then shoulders past the edge of the training yard.","Iwabee mira una vez atrás al terreno que reparó y a lo que haya dejado su elección sobre el Genin renegado, luego sale del campo de entrenamiento.");

// Metal Lee.
add("Metal is good when nobody is watching. His feet land where he wants them. His breathing stays measured. The training post shudders on the final strike and Metal immediately resets his stance to do it again. Then someone claps from behind him.","Metal es bueno cuando nadie lo observa. Sus pies caen donde quiere. Su respiración se mantiene medida. El poste de entrenamiento tiembla con el golpe final y Metal reajusta de inmediato su postura para repetirlo. Entonces alguien aplaude detrás de él.");
add("The Genin who saw him grins like the answer is obvious. “Again.”","El Genin que lo vio sonríe como si la respuesta fuera obvia. “Otra vez.”");
add("Spar. If they're watching anyway, make it count.","Combatir. Si de todos modos están mirando, que valga la pena.");
add("Do the combination again on the training dummy.","Repetir la combinación con el muñeco de entrenamiento.");
add("No. End the session here.","No. Terminar la sesión aquí.");
add("The next combination starts clean. Then Metal notices the eyes on him. His shoulder tightens. His heel lands a fraction too wide. The dummy jerks off-line hard enough to become a real problem for the student beside it.","La siguiente combinación empieza limpia. Entonces Metal nota las miradas sobre él. Se le tensa el hombro. El talón cae un poco demasiado abierto. El muñeco se desvía con suficiente fuerza para convertirse en un problema real para el estudiante que está al lado.");
add("Embarrassment can wait. The dummy cannot.","La vergüenza puede esperar. El muñeco no.");
add("Redirect it away from the student.","Desviarlo lejos del estudiante.");
add("Get between them and take the impact.","Interponerse y recibir el impacto.");
add("Break it before it reaches them.","Romperlo antes de que lo alcance.");
add("Metal lowers his hands and ends the session before the watching turns into another performance. The decision stings more than the training did.","Metal baja las manos y termina la sesión antes de que las miradas la conviertan en otra actuación. La decisión duele más que el entrenamiento.");

// Kakashi.
add("The logistics clerk keeps one hand near the sealed packet and checks the same reflection twice while crossing the market lane. Either he is nervous or he knows someone is following him. Kakashi does not need to decide which yet.","El empleado de logística mantiene una mano cerca del paquete sellado y comprueba dos veces el mismo reflejo mientras cruza el mercado. O está nervioso o sabe que alguien lo sigue. Kakashi todavía no necesita decidir cuál de las dos.");
add("Stay invisible. Watch who receives it.","Mantenerse invisible. Ver quién lo recibe.");
add("Step in now and force the route into the open.","Intervenir ahora y obligar a que la ruta quede expuesta.");
add("Cut ahead. Be where the packet is going.","Adelantarse. Estar donde va el paquete.");
add("Then the retrieval fractures into three problems at once: a confirmed packet, an assassin creating pressure and an apparent carrier moving away. Kakashi can pursue all three badly or choose which fact matters most.","Entonces la recuperación se divide en tres problemas a la vez: un paquete confirmado, un asesino creando presión y un aparente portador alejándose. Kakashi puede perseguir mal los tres o elegir qué hecho importa más.");
add("The objective mattered. Everything else was noise.","El objetivo importaba. Todo lo demás era ruido.");
add("Proof mattered. Guessing correctly is still guessing.","La prueba importaba. Adivinar correctamente sigue siendo adivinar.");
add("The hard part was deciding which responsibility was actually mine.","Lo difícil era decidir qué responsabilidad era realmente mía.");
add("Sakumo is at the Hatake threshold when Kakashi gets home. He takes one look at his son's face and does not ask whether he passed. “You picked one.” Kakashi's eyes narrow slightly. “I had to.” Sakumo nods once. “That's usually when the choice matters.”","Sakumo está en el umbral de los Hatake cuando Kakashi llega a casa. Mira una vez el rostro de su hijo y no pregunta si aprobó. “Elegiste una.” Los ojos de Kakashi se estrechan ligeramente. “Tenía que hacerlo.” Sakumo asiente una vez. “Normalmente es ahí cuando la elección importa.”");

// Obito.
add("Obito leaves early. Deliberately early. Today is one of the sessions that matters—the kind where nobody can say he only talks about becoming Hokage. He makes it three streets before somebody needs something.","Obito sale temprano. Deliberadamente temprano. Hoy es una de las sesiones que importan, de esas en las que nadie puede decir que solo habla de convertirse en Hokage. Recorre tres calles antes de que alguien necesite algo.");
add("“Hang on. I'll get the other end.”","“Espera. Yo tomo el otro extremo.”");
add("Brace it, free the doorway, keep moving.","Sostenerlo, liberar la puerta y seguir avanzando.");
add("Keep going. Training starts whether he's there or not.","Seguir. El entrenamiento empieza esté él allí o no.");
add("Get every last one before the carts crush them.","Recoger hasta la última antes de que los carros las aplasten.");
add("Clear the lane fast, then run.","Despejar el carril rápido y luego correr.");
add("Keep moving. Somebody else can stop.","Seguir avanzando. Alguien más puede detenerse.");
add("Help search until it's found.","Ayudar a buscar hasta encontrarlo.");
add("Check the obvious drop points on his route.","Revisar los puntos de caída evidentes de su ruta.");
add("Academy staff can handle Academy equipment. Keep going.","El personal de la Academia puede encargarse del equipo de la Academia. Seguir.");
add("Right the cart and rebuild the load.","Enderezar el carro y recomponer la carga.");
add("Clear the dangerous obstruction and move.","Retirar la obstrucción peligrosa y avanzar.");
add("Go around.","Rodear el obstáculo.");
add("Stop it.","Detenerlo.");
add("Get everyone out of its path.","Sacar a todos de su trayectoria.");
add("Keep moving.","Seguir avanzando.");
add("Obito hits the training approach breathing hard but on time. For once, there is nobody to blame, nobody to wait for and no excuse to make. The whole session is still ahead of him.","Obito llega al acceso del entrenamiento respirando con fuerza, pero a tiempo. Por una vez no hay nadie a quien culpar, nadie a quien esperar ni excusa que dar. Toda la sesión sigue por delante.");
add("Obito reaches the training approach later than he planned. The session is already underway; what remains must be resolved from the journey time he actually spent, not from whether helping was ‘good’ or ‘bad’.","Obito llega al acceso del entrenamiento más tarde de lo planeado. La sesión ya está en marcha; lo que quede debe resolverse a partir del tiempo de viaje que realmente empleó, no de si ayudar fue ‘bueno’ o ‘malo’.");
add("The opening conditioning block has not closed yet. Obito can still make the whole session.","El bloque inicial de acondicionamiento todavía no ha terminado. Obito aún puede completar toda la sesión.");
add("Training is already in progress. The exact remaining blocks must follow the authoritative arrival-time result for this journey.","El entrenamiento ya está en marcha. Los bloques exactos que queden deben seguir el resultado autoritativo de hora de llegada para este viaje.");
add("Obito joins the session: conditioning until his legs burn, weapon fundamentals until his grip stops slipping, Academy-scale Fire work and the Taijutsu closing drill.","Obito se une a la sesión: acondicionamiento hasta que le arden las piernas, fundamentos de armas hasta que deja de resbalarle el agarre, trabajo de Fuego a escala de Academia y el ejercicio final de Taijutsu.");
add("I'm still becoming Hokage.","Todavía voy a convertirme en Hokage.");
add("Next time I get here faster.","La próxima vez llegaré más rápido.");
add("They mattered too.","Ellos también importaban.");
add("Fine. I'll prove it again.","Bien. Lo demostraré otra vez.");
add("Obito looks toward the Hokage Monument for another second, then turns back toward the village. Whatever the journey cost him, the answer in his head is still his.","Obito mira un segundo más hacia el Monumento Hokage y luego vuelve la vista hacia la aldea. Sea cual sea el costo del viaje, la respuesta en su cabeza sigue siendo suya.");

// Dynamic final-Writing render variants. The underlying branch IDs remain in
// 33600; this only enumerates their finite visible sentence outcomes.
const hinH1=[
  ["moved first","se movió primero"],
  ["waited until the opening showed itself","esperó hasta que la apertura se mostró"],
  ["made the opponent come through her guard","obligó al oponente a atravesar su guardia"],
  ["watched the shoulders and feet before committing","observó hombros y pies antes de comprometerse"],
  ["committed to an opening approach","se comprometió con un enfoque inicial"]
];
const hinH2=[
  ["pressed when the advantage appeared","presionó cuando apareció la ventaja"],
  ["redirected the return attack","redirigió el contraataque"],
  ["created distance","creó distancia"],
  ["changed approach when the exchange shifted","cambió de enfoque cuando cambió el intercambio"],
  ["adapted through the middle exchange","se adaptó durante el intercambio intermedio"]
];
const hinH3=[
  ["committed to the strike","se comprometió con el golpe"],
  ["countered","contraatacó"],
  ["stayed patient","mantuvo la paciencia"],
  ["trusted what she had observed","confió en lo que había observado"],
  ["made the final decision","tomó la decisión final"]
];
for(const a of hinH1)for(const b of hinH2)for(const c of hinH3)add(
  `The instructor stops the exchange, corrects Hinata's footing and makes her repeat the decisive moment once. She ${a[0]}, ${b[0]}, then ${c[0]}. No speech. Just: “Again.” Hinata resets without looking away.`,
  `El instructor detiene el intercambio, corrige la posición de los pies de Hinata y le hace repetir una vez el momento decisivo. Ella ${a[1]}, ${b[1]} y luego ${c[1]}. Sin discurso. Solo: “Otra vez.” Hinata vuelve a colocarse sin apartar la mirada.`
);
const izRoutes=[
  ["the longer river route","la ruta más larga del río"],
  ["the stronger trail that turned false","el rastro más fuerte que resultó ser falso"],
  ["the interruption she chose to answer","la interrupción a la que decidió responder"],
  ["the extraction route she predicted","la ruta de extracción que predijo"],
  ["the route she committed to","la ruta con la que se comprometió"]
];
for(const route of izRoutes)add(
  `By the time the instructor calls the exercise, Wasabi has an answer—and a trail of reasons behind it. She has to account for ${route[0]}: what she actually saw, what she assumed and what happened while the target kept moving.`,
  `Cuando el instructor da por terminado el ejercicio, Wasabi tiene una respuesta y un rastro de razones detrás. Tiene que explicar ${route[1]}: lo que realmente vio, lo que supuso y lo que ocurrió mientras el objetivo seguía moviéndose.`
);
const mirDetails=[
  ["The clothing no longer fits the country they described.","La ropa ya no encaja con el país que describió."],
  ["The route no longer fits the route they described.","La ruta ya no encaja con la que describió."],
  ["A family detail comes back differently.","Un detalle familiar vuelve de forma distinta."],
  ["A detail about the trip to Konoha comes back differently.","Un detalle sobre el viaje a Konoha vuelve de forma distinta."],
  ["One small detail refuses to fit.","Un pequeño detalle se niega a encajar."]
];
for(const detail of mirDetails)add(
  `Later, one small detail refuses to fit. Then another. ${detail[0]} Nothing proves anything yet. It is simply wrong enough to stay in Mirai's head.`,
  `Más tarde, un pequeño detalle se niega a encajar. Luego otro. ${detail[1]} Todavía nada demuestra nada. Simplemente está lo bastante mal como para quedarse en la cabeza de Mirai.`
);
const mirReactions=[
  ["The new answer gives Mirai another detail to compare.","La nueva respuesta le da a Mirai otro detalle que comparar."],
  ["She keeps escort formation and waits for the next contradiction.","Mantiene la formación de escolta y espera la siguiente contradicción."],
  ["The unannounced route change produces a reaction she can actually observe.","El cambio de ruta sin aviso produce una reacción que sí puede observar."],
  ["Mirai keeps watching.","Mirai sigue observando."]
];
for(const reaction of mirReactions)add(
  `Suspicion has become a pattern. It still is not proof. ${reaction[0]}`,
  `La sospecha se ha convertido en un patrón. Aún no es una prueba. ${reaction[1]}`
);
const iwaTerrains=[
  ["The collapsed section heaves upward and locks into a usable shelf.","La sección colapsada se eleva y se fija formando una plataforma utilizable."],
  ["The broken ground settles under his Earth Release until the lane lies flat again.","El terreno roto se asienta bajo su Elemento Tierra hasta que el carril vuelve a quedar plano."],
  ["Stone rises into a stable path through the damaged section.","La piedra se eleva formando un camino estable a través de la sección dañada."],
  ["The weakest section thickens and braces against the damaged ground around it.","La sección más débil se engrosa y se refuerza contra el terreno dañado que la rodea."],
  ["The damaged ground changes under Iwabee's Earth Release.","El terreno dañado cambia bajo el Elemento Tierra de Iwabee."]
];
for(const terrain of iwaTerrains)add(
  `${terrain[0]} Then something underneath the collapsed edge moves. A Genin in travel-stained gear rolls out of the newly exposed hollow and freezes when he sees the Academy group. He was hiding here. He was not part of the lesson.`,
  `${terrain[1]} Entonces algo se mueve bajo el borde colapsado. Un Genin con ropa marcada por el viaje sale rodando del hueco recién expuesto y se queda inmóvil al ver al grupo de la Academia. Estaba escondido aquí. No formaba parte de la lección.`
);
const metalResponses=[
  ["The student is clear of the dummy's path because Metal chose to redirect it.","El estudiante queda fuera de la trayectoria del muñeco porque Metal decidió desviarlo."],
  ["Metal put himself between the student and the impact.","Metal se interpuso entre el estudiante y el impacto."],
  ["The dummy never reaches the student; Metal chose to break it first.","El muñeco nunca llega al estudiante; Metal decidió romperlo primero."]
];
for(const response of metalResponses)add(
  `${response[0]} When the yard settles, Metal is still thinking about the first combination—the one he landed clean before anyone clapped.`,
  `${response[1]} Cuando el patio se calma, Metal sigue pensando en la primera combinación, la que ejecutó limpiamente antes de que nadie aplaudiera.`
);
add("Metal leaves with the private session and the moment he backed out both still sitting in his head. Neither one disappears because the other happened.","Metal se marcha con la sesión privada y el momento en que se retiró todavía presentes en su cabeza. Ninguno desaparece porque el otro haya ocurrido.");
const kakRoutes=[
  ["The packet is on the table in front of the evaluator.","El paquete está sobre la mesa frente al evaluador."],
  ["The packet is not.","El paquete no está."]
];
const kakEvidence=[
  ["Kakashi can describe the custody transfer because he watched it happen.","Kakashi puede describir la transferencia de custodia porque la vio ocurrir."],
  ["Some of what Kakashi knows came from answers he had to weigh against movement he observed.","Parte de lo que Kakashi sabe provino de respuestas que tuvo que contrastar con los movimientos que observó."],
  ["Kakashi predicted the destination correctly without pretending he witnessed the route that led there.","Kakashi predijo correctamente el destino sin fingir que presenció la ruta que llevó hasta allí."]
];
for(const route of kakRoutes)for(const evidence of kakEvidence)add(
  `${route[0]} The evaluator makes Kakashi reconstruct the operation in order: what he saw, what he inferred and what was lost when he chose one responsibility over another. ${evidence[0]}`,
  `${route[1]} El evaluador hace que Kakashi reconstruya la operación en orden: lo que vio, lo que infirió y lo que se perdió cuando eligió una responsabilidad sobre otra. ${evidence[1]}`
);

const en={},es={};
for(let i=0;i<pairs.length;i++){
  const key=`issue190.finalwriting.${String(i+1).padStart(3,"0")}`;
  en[key]=pairs[i][0];es[key]=pairs[i][1];
}
const enResult=core.registerLocaleMessages("en",en);
const esResult=core.registerLocaleMessages("es-419",es);
const glossaryFailures=[];
for(const [source,translated] of pairs){const check=core.validateProtectedTerms(source,translated);if(!check.success)glossaryFailures.push({source,missing:check.missing});}
const sourceTexts=Object.freeze(pairs.map(row=>row[0]));
function diagnostics(){
  const checks={
    englishRegistered:enResult&&enResult.success===true&&enResult.count===pairs.length,
    spanishRegistered:esResult&&esResult.success===true&&esResult.count===pairs.length,
    substantialFinalWritingCoverage:pairs.length>=230,
    glossaryClean:glossaryFailures.length===0,
    hinataDynamicCovered:sourceTexts.some(text=>text.startsWith("The instructor stops the exchange, corrects Hinata's footing")),
    wasabiDynamicCovered:sourceTexts.some(text=>text.startsWith("By the time the instructor calls the exercise, Wasabi has an answer")),
    miraiDynamicCovered:sourceTexts.some(text=>text.startsWith("Later, one small detail refuses to fit"))&&sourceTexts.some(text=>text.startsWith("Suspicion has become a pattern")),
    iwabeeDynamicCovered:sourceTexts.some(text=>text.includes("Then something underneath the collapsed edge moves.")),
    metalDynamicCovered:sourceTexts.some(text=>text.includes("When the yard settles, Metal is still thinking")),
    kakashiDynamicCovered:sourceTexts.some(text=>text.includes("The evaluator makes Kakashi reconstruct the operation in order")),
    obitoFinalCovered:sourceTexts.includes("Obito looks toward the Hokage Monument for another second, then turns back toward the village. Whatever the journey cost him, the answer in his head is still his."),
    browserGoldenClaimed:false
  };
  const failed=Object.entries(checks).filter(([key,value])=>key!=="browserGoldenClaimed"&&value!==true).map(([key])=>key);
  return{patchId:PATCH_ID,pass:failed.length===0,checks,failed,pairCount:pairs.length,glossaryFailures:[...glossaryFailures],browserGoldenClaimed:false};
}
globalThis.SC_ALPHA_LOCALISATION_FINAL_WRITING_35520=Object.freeze({patchId:PATCH_ID,pairCount:pairs.length,sourceTexts,diagnostics,browserGoldenClaimed:false});
try{core.applyDocument();}catch(_error){}
})();
