import '../styles/style.scss'
import '../index.html'

// Предмет перетаскиваемый
function dragStart(d){
    console.log('drag start');
    ev = d.originalEvent;
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("id", ev.target.getAttribute('id'));   
    ev.dataTransfer.setDragImage(ev.target,16,16);
    return true;
}
$('.item').on('dragstart',dragStart)

// Зона
function dragEnter(ev) {
    event.preventDefault();
    return true;
}
function dragOver(ev) {
    event.preventDefault();
}
function dragDrop(d) {
    let ev = d.originalEvent;
    var data = ev.dataTransfer.getData("id");
    console.log('drag drop',data);
    ev.target.appendChild(document.getElementById(data));
    ev.stopPropagation();
    return false;
}
$('.slot').on('dragenter',dragEnter)
        .on('dragover',dragOver)
        .on('drop',dragDrop)