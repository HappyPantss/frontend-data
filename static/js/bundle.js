(function (d3$1) {
    'use strict';
  
    const dataSource2 = 'https://opendata.rdw.nl/resource/6wzd-evwu.json'; // GEO PenR
    const selectedColumn = 'startdataarea';
  
    // Get data from dataSource 2 (GEO PenR) and count all the years in the array
    getData(dataSource2).then((RDWData) => {
      // console.log("all data: ", RDWData)
      const locationArray = filterData(RDWData, selectedColumn);
      console.log('All location data', locationArray);
      
      // Thanks to @Razpudding / Laurens
      let aantalPerJaarArray = [];
      locationArray.forEach((jaar) => {
        // if the array includes a empty value, change it to 0
        // else make a new array with all the years + number of values
        if (aantalPerJaarArray.find((item) => item.year == jaar) == undefined) {
          aantalPerJaarArray.push({
            year: jaar,
            value: 0,
          });
        }
        // Count for every found item 1 to the value
        aantalPerJaarArray.find((item) => item.year == jaar).value += 1;
      });
      // Unique values
      const uniqueAreaValues = listUnique(locationArray);
      console.log('Unique area values:', uniqueAreaValues);
      
        makePieChart(aantalPerJaarArray);
    });
  
    // Fetch the data to json
    async function getData(url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
  
    // Returns all values for a certain key in an array of data
    let filterData = (dataArray, key) => {
      return dataArray.map((item) => item[key].slice(0, 4));
    };
  
    // Returns all unique values in an array
    let listUnique = (dataArray) => {
      //logica which finds unique values
      let uniqueArray = [];
      dataArray.forEach((item) => {
        if (uniqueArray.indexOf(item) == -1) {
          uniqueArray.push(item);
        }
      });
      return uniqueArray;
    };
  
    // Making the pie chart
    function makePieChart(data) {
      console.log('Making piechart', data);
      const svg = d3$1.select('svg');
  
      const width = +svg.attr('width');
      const height = +svg.attr('height');
  
      let radius = 170;
      const g = svg
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);
  
      // const color = scaleOrdinal(["#4497eb", "#3679bc", "#295b8d", "#1b3c5e", "#0e1e2f"]);
      const color = d3$1.scaleOrdinal(d3.schemeCategory10);
  
      // Add .sort(null) after .pie() if you don't want to sort it
      const pie = d3.pie().value((d) => d.value);
  
      let path = d3$1.arc()
        .outerRadius(radius)
        .innerRadius(radius - 100);
  
      let pathOver = d3$1.arc()
        .outerRadius(radius + 10)
        .innerRadius(radius - 90);
  
      let colorPaths = (d) => color(d.data.value);
  
      const label = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius + 60);
  
      const labelValue = d3
        .arc()
        .outerRadius(radius)
        .innerRadius(radius - 70);
  
      const pies = g
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');
  
      pies
        .append('path')
        .attr('d', path)
        .attr('fill', colorPaths)
        .attr('class', 'arcPath')
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut);
             // .on('click', onMouseClick)
  
      pies
        .append('text')
        .text((d) => d.data.year)
        .attr('class', 'arcText')
        .attr('transform', function (d) {
          return 'translate(' + label.centroid(d) + ')';
        });
             // .attr('transform', d => `translate(${label.centroid(d)})`)
  
      pies
        .append('text')
        .text((d) => d.data.value)
        .attr('fill', colorPaths)
        .attr('transform', function (d) {
          return 'translate(' + labelValue.centroid(d) + ')';
        });
  
      function onMouseOver() {
        d3.select(this)
          .transition(1000)
          .attr('fill-opacity', '0.5')
          .attr('class', 'pathHover')
          .attr('d', pathOver);
        // console.log('*in*');
      }
  
      function onMouseOut() {
        d3.select(this)
          .transition(1000)
          .attr('fill-opacity', '1')
          .attr('class', 'arcPath')
          .attr('stroke', '')
          .attr('d', path);
        // console.log('*out*')
      }
    }
  
    // function onMouseClick() {
    //   // console.log('*click*');
    // }
  
  }(d3));
  
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImNvbmZpZy5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBvdmVydmlld1VybCA9ICdodHRwczovL25wcm9wZW5kYXRhLnJkdy5ubC9wYXJraW5nZGF0YS92Mi8nXG5leHBvcnQgY29uc3QgZGF0YVNvdXJjZTEgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvcWlkbS03bWtmLmpzb24nIC8vIE9wZW4gRGF0YSBQYXJrZXJlbjogR0VCUlVJS1NET0VMXG5leHBvcnQgY29uc3QgZGF0YVNvdXJjZTIgPSAnaHR0cHM6Ly9vcGVuZGF0YS5yZHcubmwvcmVzb3VyY2UvNnd6ZC1ldnd1Lmpzb24nIC8vIEdFTyBQZW5SXG5leHBvcnQgY29uc3QgcHJveHlVcmwgPSAnaHR0cHM6Ly9jb3JzLWFueXdoZXJlLmhlcm9rdWFwcC5jb20vJyAvLyBDT1JTXG5leHBvcnQgY29uc3Qgc2VsZWN0ZWRDb2x1bW4gPSAnc3RhcnRkYXRhYXJlYSdcbmV4cG9ydCBjb25zdCBzZWxlY3RlZENvbHVtbjIgPSAndXNhZ2VpZCciLCJpbXBvcnQgeyBzZWxlY3QsIGFyYywgb3V0ZXJSYWRpdXMsIGlubmVyUmFkaXVzLCBzY2FsZU9yZGluYWwgfSBmcm9tICdkMyc7XG5cbmltcG9ydCB7XG4gIGRhdGFTb3VyY2UxLFxuICBkYXRhU291cmNlMixcbiAgcHJveHlVcmwsXG4gIHNlbGVjdGVkQ29sdW1uLFxufSBmcm9tICcuL2NvbmZpZy5qcyc7XG5cbi8vIEdldCBkYXRhIGZyb20gZGF0YVNvdXJjZSAyIChHRU8gUGVuUikgYW5kIGNvdW50IGFsbCB0aGUgeWVhcnMgaW4gdGhlIGFycmF5XG5nZXREYXRhKGRhdGFTb3VyY2UyKS50aGVuKChSRFdEYXRhKSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKFwiYWxsIGRhdGE6IFwiLCBSRFdEYXRhKVxuICBjb25zdCBsb2NhdGlvbkFycmF5ID0gZmlsdGVyRGF0YShSRFdEYXRhLCBzZWxlY3RlZENvbHVtbik7XG4gIGNvbnNvbGUubG9nKCdBbGwgbG9jYXRpb24gZGF0YScsIGxvY2F0aW9uQXJyYXkpO1xuICBcbiAgLy8gVGhhbmtzIHRvIEBSYXpwdWRkaW5nIC8gTGF1cmVuc1xuICBsZXQgYWFudGFsUGVySmFhckFycmF5ID0gW107XG4gIGxvY2F0aW9uQXJyYXkuZm9yRWFjaCgoamFhcikgPT4ge1xuICAgIC8vIGlmIHRoZSBhcnJheSBpbmNsdWRlcyBhIGVtcHR5IHZhbHVlLCBjaGFuZ2UgaXQgdG8gMFxuICAgIC8vIGVsc2UgbWFrZSBhIG5ldyBhcnJheSB3aXRoIGFsbCB0aGUgeWVhcnMgKyBudW1iZXIgb2YgdmFsdWVzXG4gICAgaWYgKGFhbnRhbFBlckphYXJBcnJheS5maW5kKChpdGVtKSA9PiBpdGVtLnllYXIgPT0gamFhcikgPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhYW50YWxQZXJKYWFyQXJyYXkucHVzaCh7XG4gICAgICAgIHllYXI6IGphYXIsXG4gICAgICAgIHZhbHVlOiAwLFxuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIENvdW50IGZvciBldmVyeSBmb3VuZCBpdGVtIDEgdG8gdGhlIHZhbHVlXG4gICAgYWFudGFsUGVySmFhckFycmF5LmZpbmQoKGl0ZW0pID0+IGl0ZW0ueWVhciA9PSBqYWFyKS52YWx1ZSArPSAxO1xuICB9KTtcbiAgLy8gVW5pcXVlIHZhbHVlc1xuICBjb25zdCB1bmlxdWVBcmVhVmFsdWVzID0gbGlzdFVuaXF1ZShsb2NhdGlvbkFycmF5KTtcbiAgY29uc29sZS5sb2coJ1VuaXF1ZSBhcmVhIHZhbHVlczonLCB1bmlxdWVBcmVhVmFsdWVzKTtcbiAgXG5cdG1ha2VQaWVDaGFydChhYW50YWxQZXJKYWFyQXJyYXkpO1xufSk7XG5cbi8vIEZldGNoIHRoZSBkYXRhIHRvIGpzb25cbmFzeW5jIGZ1bmN0aW9uIGdldERhdGEodXJsKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8vIFJldHVybnMgYWxsIHZhbHVlcyBmb3IgYSBjZXJ0YWluIGtleSBpbiBhbiBhcnJheSBvZiBkYXRhXG5sZXQgZmlsdGVyRGF0YSA9IChkYXRhQXJyYXksIGtleSkgPT4ge1xuICByZXR1cm4gZGF0YUFycmF5Lm1hcCgoaXRlbSkgPT4gaXRlbVtrZXldLnNsaWNlKDAsIDQpKTtcbn07XG5cbi8vIFJldHVybnMgYWxsIHVuaXF1ZSB2YWx1ZXMgaW4gYW4gYXJyYXlcbmxldCBsaXN0VW5pcXVlID0gKGRhdGFBcnJheSkgPT4ge1xuICAvL2xvZ2ljYSB3aGljaCBmaW5kcyB1bmlxdWUgdmFsdWVzXG4gIGxldCB1bmlxdWVBcnJheSA9IFtdO1xuICBkYXRhQXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGlmICh1bmlxdWVBcnJheS5pbmRleE9mKGl0ZW0pID09IC0xKSB7XG4gICAgICB1bmlxdWVBcnJheS5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB1bmlxdWVBcnJheTtcbn07XG5cbi8vIE1ha2luZyB0aGUgcGllIGNoYXJ0XG5mdW5jdGlvbiBtYWtlUGllQ2hhcnQoZGF0YSkge1xuICBjb25zb2xlLmxvZygnTWFraW5nIHBpZWNoYXJ0JywgZGF0YSk7XG4gIGNvbnN0IHN2ZyA9IHNlbGVjdCgnc3ZnJyk7XG5cbiAgY29uc3Qgd2lkdGggPSArc3ZnLmF0dHIoJ3dpZHRoJyk7XG4gIGNvbnN0IGhlaWdodCA9ICtzdmcuYXR0cignaGVpZ2h0Jyk7XG5cbiAgbGV0IHJhZGl1cyA9IDE3MDtcbiAgY29uc3QgZyA9IHN2Z1xuICAgIC5hcHBlbmQoJ2cnKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7d2lkdGggLyAyfSwgJHtoZWlnaHQgLyAyfSlgKTtcblxuICAvLyBjb25zdCBjb2xvciA9IHNjYWxlT3JkaW5hbChbXCIjNDQ5N2ViXCIsIFwiIzM2NzliY1wiLCBcIiMyOTViOGRcIiwgXCIjMWIzYzVlXCIsIFwiIzBlMWUyZlwiXSk7XG4gIGNvbnN0IGNvbG9yID0gc2NhbGVPcmRpbmFsKGQzLnNjaGVtZUNhdGVnb3J5MTApO1xuXG4gIC8vIEFkZCAuc29ydChudWxsKSBhZnRlciAucGllKCkgaWYgeW91IGRvbid0IHdhbnQgdG8gc29ydCBpdFxuICBjb25zdCBwaWUgPSBkMy5waWUoKS52YWx1ZSgoZCkgPT4gZC52YWx1ZSk7XG5cbiAgbGV0IHBhdGggPSBhcmMoKVxuICAgIC5vdXRlclJhZGl1cyhyYWRpdXMpXG4gICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDEwMCk7XG5cbiAgbGV0IHBhdGhPdmVyID0gYXJjKClcbiAgICAub3V0ZXJSYWRpdXMocmFkaXVzICsgMTApXG4gICAgLmlubmVyUmFkaXVzKHJhZGl1cyAtIDkwKTtcblxuICBsZXQgY29sb3JQYXRocyA9IChkKSA9PiBjb2xvcihkLmRhdGEudmFsdWUpO1xuXG4gIGNvbnN0IGxhYmVsID0gZDNcbiAgICAuYXJjKClcbiAgICAub3V0ZXJSYWRpdXMocmFkaXVzKVxuICAgIC5pbm5lclJhZGl1cyhyYWRpdXMgKyA2MCk7XG5cbiAgY29uc3QgbGFiZWxWYWx1ZSA9IGQzXG4gICAgLmFyYygpXG4gICAgLm91dGVyUmFkaXVzKHJhZGl1cylcbiAgICAuaW5uZXJSYWRpdXMocmFkaXVzIC0gNzApO1xuXG4gIGNvbnN0IHBpZXMgPSBnXG4gICAgLnNlbGVjdEFsbCgnLmFyYycpXG4gICAgLmRhdGEocGllKGRhdGEpKVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZCgnZycpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2FyYycpO1xuXG4gIHBpZXNcbiAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAuYXR0cignZCcsIHBhdGgpXG4gICAgLmF0dHIoJ2ZpbGwnLCBjb2xvclBhdGhzKVxuICAgIC5hdHRyKCdjbGFzcycsICdhcmNQYXRoJylcbiAgICAub24oJ21vdXNlb3ZlcicsIG9uTW91c2VPdmVyKVxuICAgIC5vbignbW91c2VvdXQnLCBvbk1vdXNlT3V0KVxuIFx0XHQvLyAub24oJ2NsaWNrJywgb25Nb3VzZUNsaWNrKVxuXG4gIHBpZXNcbiAgICAuYXBwZW5kKCd0ZXh0JylcbiAgICAudGV4dCgoZCkgPT4gZC5kYXRhLnllYXIpXG4gICAgLmF0dHIoJ2NsYXNzJywgJ2FyY1RleHQnKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGxhYmVsLmNlbnRyb2lkKGQpICsgJyknO1xuICAgIH0pO1xuIFx0XHQvLyAuYXR0cigndHJhbnNmb3JtJywgZCA9PiBgdHJhbnNsYXRlKCR7bGFiZWwuY2VudHJvaWQoZCl9KWApXG5cbiAgcGllc1xuICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgIC50ZXh0KChkKSA9PiBkLmRhdGEudmFsdWUpXG4gICAgLmF0dHIoJ2ZpbGwnLCBjb2xvclBhdGhzKVxuICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGxhYmVsVmFsdWUuY2VudHJvaWQoZCkgKyAnKSc7XG4gICAgfSk7XG5cbiAgZnVuY3Rpb24gb25Nb3VzZU92ZXIoKSB7XG4gICAgZDMuc2VsZWN0KHRoaXMpXG4gICAgICAudHJhbnNpdGlvbigxMDAwKVxuICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsICcwLjUnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhdGhIb3ZlcicpXG4gICAgICAuYXR0cignZCcsIHBhdGhPdmVyKTtcbiAgICAvLyBjb25zb2xlLmxvZygnKmluKicpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3VzZU91dCgpIHtcbiAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgIC50cmFuc2l0aW9uKDEwMDApXG4gICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgJzEnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2FyY1BhdGgnKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsICcnKVxuICAgICAgLmF0dHIoJ2QnLCBwYXRoKTtcbiAgICAvLyBjb25zb2xlLmxvZygnKm91dConKVxuICB9XG59XG5cbi8vIGZ1bmN0aW9uIG9uTW91c2VDbGljaygpIHtcbi8vICAgLy8gY29uc29sZS5sb2coJypjbGljayonKTtcbi8vIH1cbiJdLCJuYW1lcyI6WyJzZWxlY3QiLCJzY2FsZU9yZGluYWwiLCJhcmMiXSwibWFwcGluZ3MiOiI7OztFQUVPLE1BQU0sV0FBVyxHQUFHLGtEQUFpRDtFQUVyRSxNQUFNLGNBQWMsR0FBRzs7RUNLOUI7RUFDQSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLO0VBQ3ZDO0VBQ0EsRUFBRSxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0VBQzVELEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQztFQUNsRDtFQUNBO0VBQ0EsRUFBRSxJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztFQUM5QixFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUs7RUFDbEM7RUFDQTtFQUNBLElBQUksSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7RUFDM0UsTUFBTSxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7RUFDOUIsUUFBUSxJQUFJLEVBQUUsSUFBSTtFQUNsQixRQUFRLEtBQUssRUFBRSxDQUFDO0VBQ2hCLE9BQU8sQ0FBQyxDQUFDO0VBQ1QsS0FBSztFQUNMO0VBQ0EsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0VBQ3BFLEdBQUcsQ0FBQyxDQUFDO0VBQ0w7RUFDQSxFQUFFLE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0VBQ3JELEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ3ZEO0VBQ0EsQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztFQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNIO0VBQ0E7RUFDQSxlQUFlLE9BQU8sQ0FBQyxHQUFHLEVBQUU7RUFDNUIsRUFBRSxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwQyxFQUFFLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0VBQ3JDLEVBQUUsT0FBTyxJQUFJLENBQUM7RUFDZCxDQUFDO0FBQ0Q7RUFDQTtFQUNBLElBQUksVUFBVSxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsS0FBSztFQUNyQyxFQUFFLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hELENBQUMsQ0FBQztBQUNGO0VBQ0E7RUFDQSxJQUFJLFVBQVUsR0FBRyxDQUFDLFNBQVMsS0FBSztFQUNoQztFQUNBLEVBQUUsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0VBQ3ZCLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSztFQUM5QixJQUFJLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtFQUN6QyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDN0IsS0FBSztFQUNMLEdBQUcsQ0FBQyxDQUFDO0VBQ0wsRUFBRSxPQUFPLFdBQVcsQ0FBQztFQUNyQixDQUFDLENBQUM7QUFDRjtFQUNBO0VBQ0EsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFO0VBQzVCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUN2QyxFQUFFLE1BQU0sR0FBRyxHQUFHQSxXQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUI7RUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNuQyxFQUFFLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQztFQUNBLEVBQUUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO0VBQ25CLEVBQUUsTUFBTSxDQUFDLEdBQUcsR0FBRztFQUNmLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQztFQUNoQixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pFO0VBQ0E7RUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHQyxpQkFBWSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ2xEO0VBQ0E7RUFDQSxFQUFFLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDO0VBQ0EsRUFBRSxJQUFJLElBQUksR0FBR0MsUUFBRyxFQUFFO0VBQ2xCLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQztFQUN4QixLQUFLLFdBQVcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDL0I7RUFDQSxFQUFFLElBQUksUUFBUSxHQUFHQSxRQUFHLEVBQUU7RUFDdEIsS0FBSyxXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztFQUM3QixLQUFLLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDOUI7RUFDQSxFQUFFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlDO0VBQ0EsRUFBRSxNQUFNLEtBQUssR0FBRyxFQUFFO0VBQ2xCLEtBQUssR0FBRyxFQUFFO0VBQ1YsS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDO0VBQ3hCLEtBQUssV0FBVyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM5QjtFQUNBLEVBQUUsTUFBTSxVQUFVLEdBQUcsRUFBRTtFQUN2QixLQUFLLEdBQUcsRUFBRTtFQUNWLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQztFQUN4QixLQUFLLFdBQVcsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDOUI7RUFDQSxFQUFFLE1BQU0sSUFBSSxHQUFHLENBQUM7RUFDaEIsS0FBSyxTQUFTLENBQUMsTUFBTSxDQUFDO0VBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNwQixLQUFLLEtBQUssRUFBRTtFQUNaLEtBQUssTUFBTSxDQUFDLEdBQUcsQ0FBQztFQUNoQixLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUI7RUFDQSxFQUFFLElBQUk7RUFDTixLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztFQUNwQixLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO0VBQzdCLEtBQUssSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7RUFDN0IsS0FBSyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQztFQUNqQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFDO0VBQy9CO0FBQ0E7RUFDQSxFQUFFLElBQUk7RUFDTixLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDbkIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDN0IsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztFQUM3QixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUU7RUFDcEMsTUFBTSxPQUFPLFlBQVksR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUNwRCxLQUFLLENBQUMsQ0FBQztFQUNQO0FBQ0E7RUFDQSxFQUFFLElBQUk7RUFDTixLQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDbkIsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7RUFDOUIsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztFQUM3QixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLEVBQUU7RUFDcEMsTUFBTSxPQUFPLFlBQVksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztFQUN6RCxLQUFLLENBQUMsQ0FBQztBQUNQO0VBQ0EsRUFBRSxTQUFTLFdBQVcsR0FBRztFQUN6QixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0VBQ25CLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQztFQUN2QixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDO0VBQ2xDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7RUFDakMsT0FBTyxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0VBQzNCO0VBQ0EsR0FBRztBQUNIO0VBQ0EsRUFBRSxTQUFTLFVBQVUsR0FBRztFQUN4QixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0VBQ25CLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQztFQUN2QixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDO0VBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7RUFDL0IsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztFQUN6QixPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDdkI7RUFDQSxHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0E7RUFDQTtFQUNBOzs7OyJ9